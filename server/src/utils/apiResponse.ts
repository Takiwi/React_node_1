import { ReasonPhrases } from "../enums/reasonPhrases";
import { StatusCodes } from "../enums/statusCodes";
import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    metadata: any = null,
    statusCode: StatusCodes = 200,
    message: string = "Success"
  ) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
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
