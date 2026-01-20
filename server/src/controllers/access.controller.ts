import { Request, Response, NextFunction } from "express";
import AccessService from "../services/access.service";
import BaseController from "./base.controller";
import { StatusCodes } from "../enums/statusCodes";
import { BadRequestError } from "../utils/appError";

class AccessController extends BaseController {
  me = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(
      req,
      res,
      next,
      StatusCodes.OK,
      "Token is valid!",
      async () => {
        return null;
      },
    );
  };

  handlerRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    await this.handleRequest(
      req,
      res,
      next,
      StatusCodes.OK,
      "The new token has been successfully generated",
      async () => {
        if (!req.accessToken) throw new BadRequestError();
        return await AccessService.handlerRefreshToken(req.accessToken);
      },
    );
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(
      req,
      res,
      next,
      StatusCodes.OK,
      "Logged out successfully",
      async () => {
        console.log("Refresh token::::::", req.accessToken);

        await AccessService.logout(req.accessToken);

        return null;
      },
    );
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(
      req,
      res,
      next,
      StatusCodes.OK,
      "Login successfully",
      async () => {
        return await AccessService.login(req.body);
      },
    );
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(
      req,
      res,
      next,
      StatusCodes.CREATED,
      "Register successfully",
      async () => {
        return await AccessService.signup(req.body);
      },
    );
  };
}

export default new AccessController();
