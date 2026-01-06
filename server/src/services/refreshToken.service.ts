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
      const tokens = await refreshTokenSchema.create({
        userId,
        refresh_token: refreshToken,
      });

      return tokens ? tokens.userId : null;
    } catch (error) {
      console.log(error);
    }
  };
}

export default RefreshTokenService;
