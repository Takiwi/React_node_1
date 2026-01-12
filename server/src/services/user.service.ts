import userModel from "../models/user.model";
import User from "../@types/user";
import { Role } from "../utils/role";

class UserService {
  static findByEmail = async (
    email: string,
    select = {
      email: 1,
      password: 1,
      username: 1,
      status: 1,
    }
  ) => {
    return await userModel.findOne({ email }).select(select).lean();
  };

  static createUser = async ({ username, email, password, roles }: User) => {
    return userModel.create({
      username,
      email,
      password,
      roles,
    });
  };
}

export default UserService;
