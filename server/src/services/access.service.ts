import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

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
        // created private/public key
        const { publicKey, privateKey } = crypto.generateKeyPairSync(
          "rsa" as any,
          {
            modulesLength: 4096,
            publicKeyEncoding: {
              type: "spki",
              format: "pem",
            },
            privateKeyEncoding: {
              type: "pkcs8",
              format: "pem",
            },
          }
        );
        console.log({ publicKey, privateKey });
      }
    } catch (error) {
      return {
        code: "xxx",
        message: "" + error,
        status: "error",
      };
    }
  };
}

export default AccessService;
