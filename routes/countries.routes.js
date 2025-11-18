import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/countries.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);

router.get("/", role(["admin", "editor", "viewer"]), catchAsync(getCountries));
router.get("/:id", role(["admin", "editor", "viewer"]), catchAsync(getCountry));
router.post("/", role(["admin", "editor"]), catchAsync(createCountry));
router.put("/:id", role(["admin", "editor"]), catchAsync(updateCountry));
router.delete("/:id", role(["admin"]), catchAsync(deleteCountry));

export default router;
