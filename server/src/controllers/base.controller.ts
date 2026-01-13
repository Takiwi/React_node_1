import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { StatusCodes } from "../enums/statusCodes";

export default class BaseController {
  protected async handleRequest(
    req: Request,
    res: Response,
    next: NextFunction,
    statusCode: StatusCodes,
    action: () => Promise<any>
  ): Promise<void> {
    const result = await action();
    ApiResponse.success(res, result, statusCode);
  }
}
