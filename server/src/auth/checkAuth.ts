import { NextFunction, Request, Response } from "express";
import { findById } from "../services/apiKey.service";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(403).json({
        message: "Forbidden error",
      });
    }

    // check objKey
    const objKey = await findById(key);

    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden error",
      });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {}
};

const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.objKey?.permissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    console.log("Permission:::", req.objKey?.permissions);
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    return next();
  };
};

const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export { apiKey, checkPermission, asyncHandler };
