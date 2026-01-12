import { ReasonPhrases } from "./reasonPhrases";
import { StatusCodes } from "./statusCodes";
import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    message: string = "Success",
    statusCode: StatusCodes = 200,
    metadata: any = null
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      metadata,
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode: StatusCodes = 400,
    reasonPhrases: ReasonPhrases,
    code?: string
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      reasonPhrases,
      code,
    });
  }
}
