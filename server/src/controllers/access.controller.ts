import { Request, Response, NextFunction } from "express";
import AccessService from "../services/access.service";

class AccessController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("[p]:::register", req.body);
      return res.status(200).json(await AccessService.register(req.body));
    } catch (error) {
      next(error);
    }
  };
}

export default new AccessController();
