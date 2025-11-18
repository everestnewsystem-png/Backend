import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  getTasks,
  createTask,
  getTaskById,
  completeTask,
  uncompleteTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);

router.post("/", role(["admin"]), catchAsync(createTask));
router.get("/", role(["admin", "editor", "viewer"]), catchAsync(getTasks));
router.get("/:id", role(["admin", "editor", "viewer"]), catchAsync(getTaskById));
router.patch("/complete/:id", role(["admin", "editor", "viewer"]), catchAsync(completeTask));
router.patch("/uncomplete/:id", role(["admin", "editor", "viewer"]), catchAsync(uncompleteTask));
router.delete("/:id", role(["admin"]), catchAsync(deleteTask));

export default router;
