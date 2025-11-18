import express from "express";
import { loginUser } from "../controllers/auth.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.post("/login", catchAsync(loginUser));

export default router;
