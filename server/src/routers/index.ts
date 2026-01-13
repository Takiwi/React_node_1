import express from "express";
import accessRouter from "./access/access.router";
import AuthService from "../services/auth.service";

const router = express.Router();

// check api
// router.use(AuthService.apiKey);

//check permission
// router.use(AuthService.checkPermission("0000"));

router.use("/v1/api", accessRouter);

export { router };
