import express from "express";
import AccessController from "../../controllers/access.controller";

const router = express.Router();

// register
router.post("/register", AccessController.register);

// login
// router.post("/login");

// logout
// router.post("/logout");

export default router;
