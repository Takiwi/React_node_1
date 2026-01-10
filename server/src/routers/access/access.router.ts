import express from "express";
import AccessController from "../../controllers/access.controller";
import { asyncHandler } from "../../auth/checkAuth";

const router = express.Router();

// register
router.post("/register", asyncHandler(AccessController.register));

// login
// router.post("/login");

// logout
// router.post("/logout");

export default router;
