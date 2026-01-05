import express from "express";

const router = express.Router();

// register
router.post("/register");

// login
router.post("/login");

// logout
router.post("/logout");

export default router;
