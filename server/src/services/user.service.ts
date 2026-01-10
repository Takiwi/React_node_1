import userModel from "../models/user.model";

const findByEmail = async (
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

export { findByEmail };
