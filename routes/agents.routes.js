import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  getAgents,
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent,
} from "../controllers/agents.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);

router.get("/", role(["admin", "editor", "viewer"]), catchAsync(getAgents));
router.get("/:id", role(["admin", "editor", "viewer"]), catchAsync(getAgent));

router.post("/", role(["admin", "editor"]), catchAsync(createAgent));
router.put("/:id", role(["admin", "editor"]), catchAsync(updateAgent));
router.delete("/:id", role(["admin"]), catchAsync(deleteAgent));

export default router;
