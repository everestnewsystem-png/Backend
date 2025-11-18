import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  getApplicants,
  getApplicant,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  getApplicantsByCountry,
  getApplicantsByAgent,
  searchApplicants,
} from "../controllers/applicants.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);

router.get("/search", role(["admin", "editor", "viewer"]), catchAsync(searchApplicants));
router.get("/", role(["admin", "editor", "viewer"]), catchAsync(getApplicants));
router.get("/country/:id", role(["admin", "editor", "viewer"]), catchAsync(getApplicantsByCountry));
router.get("/agent/:id", role(["admin", "editor", "viewer"]), catchAsync(getApplicantsByAgent));
router.get("/:id", role(["admin", "editor", "viewer"]), catchAsync(getApplicant));
router.post("/", role(["admin", "editor"]), catchAsync(createApplicant));
router.put("/:id", role(["admin", "editor"]), catchAsync(updateApplicant));
router.delete("/:id", role(["admin"]), catchAsync(deleteApplicant));

export default router;
