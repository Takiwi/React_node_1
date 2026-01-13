import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { Role } from "../utils/role";

interface AccessTokenPayload extends JwtPayload {
  userId: string | Types.ObjectId;
  roles: Role[];
}

export { AccessTokenPayload };
