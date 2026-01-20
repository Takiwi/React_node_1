import bcrypt from "bcrypt";
import RefreshTokenService from "./token.service";
import AuthService from "../services/auth.service";
import { getInfoData } from "../utils";
import * as UserRepo from "../repositories/user.repository";
import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "../utils/appError";
import { JwtPayload } from "jsonwebtoken";
import User from "../@types/user";
import { Role } from "../enums/role";

class AccessService {
  static handlerRefreshToken = async (refreshToken: string | undefined) => {
    if (refreshToken) {
      const foundToken =
        await RefreshTokenService.findByRefreshTokenUsed(refreshToken);

      if (foundToken) {
        const decodeUser = AuthService.verifyJWT(refreshToken);

        if (typeof decodeUser !== "string" || decodeUser !== null) {
          const { userId, email } = decodeUser as JwtPayload;

          await RefreshTokenService.removeByUserId(userId);

          throw new ForbiddenError(
            "Something wrong happened!! Please re-login",
          );
        }
      }

      const holderToken =
        await RefreshTokenService.findByRefreshToken(refreshToken);

      if (!holderToken)
        throw new UnauthorizedError("User is not registered or login");

      const decodeUser = AuthService.verifyJWT(refreshToken);

      if (typeof decodeUser !== "string" || decodeUser !== null) {
        const { userId, roles } = decodeUser as JwtPayload;

        const foundUser = await UserRepo.findById(userId);

        if (!foundUser)
          throw new UnauthorizedError("User is not registered or login");

        const tokens = await AuthService.createTokenPair({ userId, roles });

        await holderToken.updateOne({
          $set: {
            refreshToken: tokens.refreshToken,
          },
          $addToSet: {
            refreshTokensUsed: refreshToken,
          },
        });

        return {
          user: { userId, roles },
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
  }: {
    email: string;
    password: string;
  }) => {
    const foundUser = await UserRepo.findByEmail(email);

    if (!foundUser) throw new BadRequestError("User not registered!");

    const match = bcrypt.compare(password, foundUser.password);

    if (!match) throw new UnauthorizedError("Authentication error");

    const tokens = await AuthService.createTokenPair({
      userId: foundUser._id,
      roles: foundUser.roles,
    });

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

  static signup = async ({ username, email, password }: User) => {
    const existingEmail = await UserRepo.findByEmail(email);

    if (existingEmail) {
      throw new BadRequestError("Error: User is already registered!");
    }

    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await UserRepo.createUser({
      username,
      email,
      password: passwordHash,
      roles: [Role.USER],
    });

    return newUser;
  };
}

export default AccessService;
