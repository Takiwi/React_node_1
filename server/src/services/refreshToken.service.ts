import refreshTokenSchema from "../models/refreshToken.model";

class RefreshTokenService {
  static saveRefreshToken = async ({
    userId,
    refreshToken,
  }: {
    userId: string;
    refreshToken: string;
  }) => {
    try {
      const filter = { user: userId },
        update = { refreshTokensUsed: [], refreshToken },
        options = { upsert: true, new: true };

      const tokens = await refreshTokenSchema.findByIdAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens._id : null;
    } catch (error) {
      console.log(error);
    }
  };

  static findByUserId = async (id: string) => {
    return await refreshTokenSchema.findOne({ userId: id }).lean();
  };

  static removeByRefreshToken = async (id: string) => {
    return await refreshTokenSchema.findOneAndDelete();
  };
}

export default RefreshTokenService;
