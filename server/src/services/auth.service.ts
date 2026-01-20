import JWT from "jsonwebtoken";
import { AccessTokenPayload } from "../@types/payload";
import { privateKey, publicKey } from "../utils/readKey";
import { asyncHandler } from "../helpers/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/appError";
import { HEADER } from "../enums/Header";
import * as ApiKey from "../repositories/apiKey.repository";
import userModel from "../models/user.model";

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
      const authHeader = req.get(HEADER.AUTHORIZATION);

      if (!authHeader) throw new UnauthorizedError("Missing token");

      const parts = authHeader.split(" ");
      if (parts.length !== 2 || parts[0] !== "Bearer")
        throw new UnauthorizedError("Invalid token format");

      console.log("Access token:::::", parts[1]);

      const decodeUser = JWT.verify(parts[1], publicKey);

      if (typeof decodeUser === "string")
        throw new UnauthorizedError("Invalid Request");

      const payload = decodeUser as AccessTokenPayload;

      const existingUser = userModel.findById(payload.userId);

      if (!existingUser) throw new UnauthorizedError("User not found");

      req.accessToken = parts[1];

      return next();
    },
  );

  static verifyJWT = (token: string) => {
    return JWT.verify(token, privateKey);
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
