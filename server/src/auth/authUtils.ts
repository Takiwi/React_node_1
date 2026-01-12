import JWT from "jsonwebtoken";
import { asyncHandler } from "../helpers/asyncHandler";
import { NextFunction, Request, Response } from "express";
import { AuthFailureError, NotFoundError } from "../core/error.response";
import { publicKey, privateKey } from "../utils/readKey";
import { AccessTokenPayload } from "../@types/payload";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (
  payload: AccessTokenPayload,
  privateKey: string
) => {
  try {
    // access token
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "15 min",
    });

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

const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.get(HEADER.CLIENT_ID);
    if (!userId) throw new AuthFailureError("Invalid Request");

    const accessToken = req.get(HEADER.AUTHORIZATION);
    if (!accessToken) throw new AuthFailureError("Invalid Request");

    try {
      const decodeUser = JWT.verify(accessToken, publicKey);
      if (typeof decodeUser === "string")
        throw new AuthFailureError("Invalid Request");

      const payload = decodeUser as AccessTokenPayload;

      if (userId !== payload.userId)
        throw new AuthFailureError("Invalid Request");

      return next();
    } catch (error) {
      throw error;
    }
  }
);

const verifyJWT = async (token: string) => {
  return await JWT.verify(token, privateKey);
};

export { createTokenPair, authentication, verifyJWT };
