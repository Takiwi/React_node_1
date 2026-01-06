import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import RefreshTokenService from "./refreshToken.service";
import { createTokenPair } from "../auth/authUtils";
import { getInfoData } from "../utils";
import { publicKey, privateKey } from "../utils/readKey";

const RoleUser = {
  USER: "USER",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
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
        return {
          code: "xxxx",
          message: "User already registered!",
        };
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
