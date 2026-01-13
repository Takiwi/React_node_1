import User from "../@types/user";
import userModel from "../models/user.model";

export const findByEmail = async (
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

export const findById = async (id: string) => {
  return await userModel.findById({ _id: id }).lean();
};

export const createUser = async ({
  username,
  email,
  password,
  roles,
}: User) => {
  return userModel.create({
    username,
    email,
    password,
    roles,
  });
};
