import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import Database from "./db/mongodb.connect";
import { router } from "./routers/index";
import { AppError, NotFoundError } from "./utils/appError";
// import { ApiError } from "./@types/error";

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
  next(new NotFoundError());
});

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server error",
  });
});

export default app;
