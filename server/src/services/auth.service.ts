import JWT from "jsonwebtoken";
import { AccessTokenPayload } from "../@types/payload";
import { privateKey, publicKey } from "../utils/readKey";
import { asyncHandler } from "../helpers/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/appError";
import { HEADER } from "../enums/Header";
import * as ApiKey from "../repositories/apiKey.repository";

export default class AuthService {
  static createTokenPair = async (payload: AccessTokenPayload) => {
    try {
      // access token
      const accessToken = JWT.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "15 min",
      });

      // refresh token
      const refreshToken = JWT.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "7 days",
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.log("cannot create tokens", error);
      return { accessToken: "", refreshToken: "" };
    }
  };

  static authentication = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.get(HEADER.CLIENT_ID);
      if (!userId) throw new UnauthorizedError("Invalid Request");

      const refreshToken = req.get(HEADER.AUTHORIZATION);
      if (!refreshToken) throw new UnauthorizedError("Invalid Request");

      try {
        const decodeUser = JWT.verify(refreshToken, publicKey);
        if (typeof decodeUser === "string")
          throw new UnauthorizedError("Invalid Request");

        const payload = decodeUser as AccessTokenPayload;

        if (userId !== payload.userId)
          throw new UnauthorizedError("Invalid Request");

        req.refreshToken = refreshToken;

        return next();
      } catch (error) {
        throw error;
      }
    }
  );

  static verifyJWT = async (token: string) => {
    return await JWT.verify(token, privateKey);
  };

  static apiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = req.headers[HEADER.API_KEY]?.toString();

      if (!key) {
        return res.status(403).json({
          message: "Forbidden error",
        });
      }

      // check objKey
      const objKey = await ApiKey.findById(key);

      if (!objKey) {
        return res.status(403).json({
          message: "Forbidden error",
        });
      }

      req.objKey = objKey;
      return next();
    } catch (error) {}
  };

  static checkPermission = (permission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.objKey?.permissions) {
        return res.status(403).json({
          message: "Permission denied",
        });
      }

      console.log("Permission:::", req.objKey?.permissions);
      const validPermission = req.objKey.permissions.includes(permission);
      if (!validPermission) {
        return res.status(403).json({
          message: "Permission denied",
        });
      }

      return next();
    };
  };
}
