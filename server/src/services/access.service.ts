import bcrypt from "bcrypt";
import RefreshTokenService from "./refreshToken.service";
import { createTokenPair, verifyJWT } from "../auth/authUtils";
import { getInfoData } from "../utils";
import { privateKey } from "../utils/readKey";
import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "../utils/appError";
import useService from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import User from "../@types/user";
import { Role } from "../utils/role";
import { AuthService } from "./auth.service";

const RoleUser = {
  USER: "USER",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static handlerRefreshToken = async (refreshToken: string | undefined) => {
    if (refreshToken) {
      const foundToken = await RefreshTokenService.findByRefreshTokenUsed(
        refreshToken
      );

      if (foundToken) {
        const decodeUser = await verifyJWT(refreshToken);

        if (typeof decodeUser !== "string" || decodeUser !== null) {
          const { userId, email } = decodeUser as JwtPayload;

          await RefreshTokenService.removeByUserId(userId);

          throw new ForbiddenError(
            "Something wrong happened!! Please re-login"
          );
        }
      }

      const holderToken = await RefreshTokenService.findByRefreshToken(
        refreshToken
      );

      if (!holderToken)
        throw new UnauthorizedError("User is not registered or login");

      const decodeUser = await verifyJWT(refreshToken);

      if (typeof decodeUser !== "string" || decodeUser !== null) {
        const { userId, email } = decodeUser as JwtPayload;

        const foundUser = await useService.findByEmail(email);
        if (!foundUser)
          throw new UnauthorizedError("User is not registered or login");

        const tokens = await createTokenPair({ userId, email }, privateKey);

        await holderToken.updateOne({
          $set: {
            refreshToken: tokens.refreshToken,
          },
          $addToSet: {
            refreshTokensUsed: refreshToken,
          },
        });

        return {
          user: { userId, email },
          tokens,
        };
      }
    }
  };

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
    const foundUser = await useService.findByEmail(email);

    if (!foundUser) throw new BadRequestError("User not registered!");

    const match = bcrypt.compare(password, foundUser.password);

    if (!match) throw new UnauthorizedError("Authentication error");

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

  static register = async ({ username, email, password }: User) => {
    try {
      const existingEmail = await useService.findByEmail(email);

      if (existingEmail) {
        throw new BadRequestError("Error: User is already registered!");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await useService.createUser({
        username,
        email,
        password: passwordHash,
        roles: [Role.USER],
      });

      if (newUser) {
        // create token pair
        const tokens = await AuthService.createTokenPair({
          userId: newUser._id,
          email,
        });

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
