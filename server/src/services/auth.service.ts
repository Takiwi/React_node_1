import JWT from "jsonwebtoken";
import { AccessTokenPayload } from "../@types/payload";
import { privateKey } from "../utils/readKey";

export class AuthService {
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
}
