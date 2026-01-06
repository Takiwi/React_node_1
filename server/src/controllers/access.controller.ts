import { Request, Response, NextFunction } from "express";

class AccessController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("[p]:::register", req.body);
      return res.status(200).json({
        code: 20001,
        metadata: { userId: 1 },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AccessController();
