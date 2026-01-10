import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import RefreshTokenService from "./refreshToken.service";
import { createTokenPair } from "../auth/authUtils";
import { getInfoData } from "../utils";
import { privateKey } from "../utils/readKey";
import { AuthFailureError, BadRequestError } from "../core/error.response";
import { findByEmail } from "./user.service";

const RoleUser = {
  USER: "USER",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static logout = async (refreshToken: string | undefined) => {
    if (refreshToken) {
      await RefreshTokenService.removeByRefreshToken(refreshToken);
    }

    return {
      user: getInfoData({
        fields: ["_id", "username", "email"],
        object: {},
      }),
    };
  };

  static login = async ({
    email,
    password,
    refreshToken = null,
  }: {
    email: string;
    password: string;
    refreshToken: string | null;
  }) => {
    const foundUser = await findByEmail(email);

    if (!foundUser) throw new BadRequestError("User not registered!");

    const match = bcrypt.compare(password, foundUser.password);

    if (!match) throw new AuthFailureError("Authentication error");

    const tokens = await createTokenPair(
      { userId: foundUser._id, email },
      privateKey
    );

    await RefreshTokenService.saveRefreshToken({
      userId: foundUser._id.toString(),
      refreshToken: tokens?.refreshToken,
    });

    return {
      user: getInfoData({
        fields: ["_id", "username", "email"],
        object: foundUser,
      }),
      tokens,
    };
  };

  static register = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const holder = await userModel.findOne({ email }).lean();

      if (holder) {
        throw new BadRequestError("Error: User is already registered!");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        username,
        email,
        password: passwordHash,
        roles: [RoleUser.USER],
      });

      if (newUser) {
        // create token pair
        const tokens = await createTokenPair(
          { userId: newUser._id, email },
          privateKey
        );

        const tokenHolder = await RefreshTokenService.saveRefreshToken({
          userId: newUser._id.toString(),
          refreshToken: tokens?.refreshToken,
        });

        if (!tokenHolder) {
          return {
            code: 200,
            metadata: null,
          };
        }

        return {
          code: 201,
          metadata: {
            user: getInfoData({
              fields: ["_id", "username", "email"],
              object: newUser,
            }),
            tokens,
          },
        };
      }

      return {
        code: "200",
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: "1 - " + error,
        status: "error",
      };
    }
  };
}

export default AccessService;
