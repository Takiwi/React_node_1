import express from "express";
import accessRouter from "./access/access.router";
import { apiKey, checkPermission } from "../auth/checkAuth";

const router = express.Router();

// check api
router.use(apiKey);

//check permission
router.use(checkPermission("0000"));

router.use("/v1/api", accessRouter);

export { router };
