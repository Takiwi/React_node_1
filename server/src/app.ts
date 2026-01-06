import express from "express";
import cors from "cors";
import { config } from "dotenv";
import Database from "./db/mongodb.connect";
import { router } from "./routers/index";

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

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express + TypeScript 🚀" });
});

export default app;
