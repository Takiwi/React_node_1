import { ReasonPhrases } from "./reasonPhrases";
import { StatusCodes } from "./statusCodes";

export class appError extends Error {
  readonly statusCode: StatusCodes;
  readonly code: number;
  readonly reason: ReasonPhrases;
  readonly details?: any;

  constructor(
    message: string,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    code: number = 500,
    reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.reason = reason;
    this.details = details;
  }
}
