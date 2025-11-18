import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import { checkPassportStatuses } from "../controllers/passport.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);
router.get("/check", role(["admin", "editor", "viewer"]), catchAsync(checkPassportStatuses));

export default router;
