import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

interface AccessTokenPayload extends JwtPayload {
  userId: string | Types.ObjectId;
  email: string;
}

export { AccessTokenPayload };
