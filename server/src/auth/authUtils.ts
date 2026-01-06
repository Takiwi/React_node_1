import JWT from "jsonwebtoken";
import { KeyObject } from "node:crypto";

const createTokenPair = async (
  payload: Record<string, unknown>,
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

export { createTokenPair };
