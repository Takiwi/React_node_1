import refreshTokenModel from "../models/refreshToken.model";

class RefreshTokenService {
  static saveRefreshToken = async ({
    userId,
    refreshToken,
  }: {
    userId: string;
    refreshToken: string;
  }) => {
    try {
      const filter = { _id: userId },
        update = { refreshTokensUsed: [], refreshToken },
        options = { upsert: true, new: true };

      const tokens = await refreshTokenModel.findByIdAndUpdate(
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
    return await refreshTokenModel.findOne({ userId: id }).lean();
  };

  static removeByRefreshToken = async (refreshToken: string) => {
    return await refreshTokenModel.findOneAndDelete({
      refreshToken: refreshToken,
    });
  };

  static findByRefreshTokenUsed = async (refreshToken: string) => {
    return await refreshTokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static removeByUserId = async (id: string) => {
    return await refreshTokenModel.findByIdAndDelete({ userId: id });
  };

  static findByRefreshToken = async (refreshToken: string) => {
    return await refreshTokenModel.findOne({ refreshToken });
  };
}

export default RefreshTokenService;
