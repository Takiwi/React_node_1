import { Response } from "express";
import { ApiSuccess } from "../types/success";

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: "success",
  CREATED: "created",
};
class SuccessResponse {
  message: string;
  status: number;
  metadata: {};

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }: ApiSuccess) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, header = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: ApiSuccess) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
  }: ApiSuccess) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}

export { OK, CREATED, SuccessResponse };
