import express from "express";
import AccessController from "../../controllers/access.controller";
import { asyncHandler } from "../../helpers/asyncHandler";
import { authentication } from "../../auth/authUtils";

const router = express.Router();

// register
router.post("/register", asyncHandler(AccessController.register));

// login
router.post("/login", asyncHandler(AccessController.login));

// authentication
router.use(authentication);

// logout
router.post("/logout", asyncHandler(AccessController.logout));

// handler refresh token
router.post("/logout", asyncHandler(AccessController.handlerRefreshToken));

export default router;
