import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  getRecentPayments,
  getApplicantPayments,
  searchPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
} from "../controllers/payments.controller.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = express.Router();

router.use(auth);

router.get("/recent", role(["admin", "editor", "viewer"]), catchAsync(getRecentPayments));
router.get("/applicant/:id", role(["admin", "editor", "viewer"]), catchAsync(getApplicantPayments));
router.get("/search", role(["admin", "editor", "viewer"]), catchAsync(searchPayments));
router.get("/record/:id", role(["admin", "editor", "viewer"]), catchAsync(getPaymentById));

router.post("/", role(["admin", "editor"]), catchAsync(createPayment));
router.put("/:id", role(["admin", "editor"]), catchAsync(updatePayment));
router.delete("/:id", role(["admin"]), catchAsync(deletePayment));

export default router;
