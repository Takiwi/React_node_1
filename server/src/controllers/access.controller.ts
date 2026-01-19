import { Request, Response, NextFunction } from "express";
import AccessService from "../services/access.service";
import BaseController from "./base.controller";
import { StatusCodes } from "../enums/statusCodes";
import { BadRequestError } from "../utils/appError";

class AccessController extends BaseController {
  handlerRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    await this.handleRequest(req, res, next, StatusCodes.OK, async () => {
      if (!req.refreshToken) throw new BadRequestError();
      return await AccessService.handlerRefreshToken(req.refreshToken);
    });
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, StatusCodes.OK, async () => {
      console.log("Refresh token::::::", req.refreshToken);

      await AccessService.logout(req.refreshToken);

      return { message: "Logged out successfully" };
    });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, StatusCodes.OK, async () => {
      return await AccessService.login(req.body);
    });
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, StatusCodes.CREATED, async () => {
      return await AccessService.signup(req.body);
    });
  };
}

export default new AccessController();
