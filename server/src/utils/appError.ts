import { ReasonPhrases } from "./reasonPhrases";
import { StatusCodes } from "./statusCodes";

class AppError extends Error {
  readonly statusCode: StatusCodes;
  readonly code: number;
  readonly reason: ReasonPhrases;
  readonly details?: any;

  protected constructor(
    message: string,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    code: number = 500,
    reason: ReasonPhrases = ReasonPhrases.INTERNAL_SERVER_ERROR,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.reason = reason;
    this.details = details;
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, StatusCodes.NOT_FOUND, 404, ReasonPhrases.NOT_FOUND);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, StatusCodes.UNAUTHORIZED, 401, ReasonPhrases.UNAUTHORIZED);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, StatusCodes.FORBIDDEN, 403, ReasonPhrases.FORBIDDEN);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, StatusCodes.CONFLICT, 409, ReasonPhrases.CONFLICT);
  }
}

export {
  AppError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
};
