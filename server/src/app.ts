import express from "express";
import cors from "cors";
import { config } from "dotenv";
import Database from "./db/mongodb.connect";

config();

const app = express();

// init databases
Database.getInstance();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express + TypeScript 🚀" });
});

export default app;
