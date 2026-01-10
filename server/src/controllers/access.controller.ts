import { Request, Response, NextFunction } from "express";
import AccessService from "../services/access.service";

class AccessController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await AccessService.register(req.body));
  };
}

export default new AccessController();
