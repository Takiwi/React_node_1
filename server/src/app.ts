import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import Database from "./db/mongodb.connect";
import { router } from "./routers/index";
import { ApiError } from "./@types/error";

config();

const app = express();

// init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init databases
Database.getInstance();

app.use(cors());
app.use(express.json());

// init router
app.use("/", router);

// handling error
app.use((req, res, next) => {
  const error: ApiError = { message: "Not Found", status: 404 };
  next(error);
});

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server error",
  });
});

export default app;
