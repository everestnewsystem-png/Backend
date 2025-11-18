import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);
router.use(role(["admin"]));

router.get("/", catchAsync(getUsers));
router.get("/:id", catchAsync(getUser));
router.post("/", catchAsync(createUser));
router.put("/:id", catchAsync(updateUser));
router.delete("/:id", catchAsync(deleteUser));

export default router;
