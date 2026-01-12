import { Request, Response, NextFunction } from "express";
import AccessService from "../services/access.service";
import { ApiResponse } from "../utils/apiResponse";
import { StatusCodes } from "../utils/statusCodes";

class AccessController {
  handlerRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    ApiResponse.success(
      res,
      "Get token success",
      StatusCodes.OK,
      await AccessService.handlerRefreshToken(req.refreshToken)
    );
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    ApiResponse.success(
      res,
      "Logout success",
      StatusCodes.OK,
      await AccessService.logout(req.refreshToken)
    );
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    ApiResponse.success(
      res,
      "Login success",
      StatusCodes.OK,
      await AccessService.login(req.body)
    );
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    ApiResponse.success(
      res,
      "Registered Ok",
      StatusCodes.CREATED,
      await AccessService.register(req.body)
    );
  };
}

export default new AccessController();
