import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import { checkPoliceStatus } from "../controllers/police.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);
router.get("/check", role(["admin", "editor", "viewer"]), catchAsync(checkPoliceStatus));

export default router;
