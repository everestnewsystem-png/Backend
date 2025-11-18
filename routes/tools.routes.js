import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import { setAppointments, progressChange } from "../controllers/tools.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);
router.put("/appointment-set", role(["admin", "editor"]), catchAsync(setAppointments));
router.put("/progress-change", role(["admin", "editor"]), catchAsync(progressChange));

export default router;
