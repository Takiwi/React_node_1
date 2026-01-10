import { Request, Response, NextFunction } from "express";
import AccessService from "../services/access.service";
import { CREATED, OK, SuccessResponse } from "../core/success.response";

class AccessController {
  logout = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await AccessService.logout(req.refreshToken),
    }).send(res);
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Login success",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: "Registered Ok",
      metadata: await AccessService.register(req.body),
    }).send(res);
  };
}

export default new AccessController();
