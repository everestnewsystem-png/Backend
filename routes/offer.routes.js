// routes/offer.routes.js
import express from "express";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getOffers,
  createOffer,
  deleteOffer,
} from "../controllers/offer.controller.js";

const router = express.Router();

// -------- OFFER COMPANIES ----------
router.get("/companies", getCompanies);          // GET all companies
router.post("/companies", createCompany);        // CREATE company
router.put("/companies/:id", updateCompany);     // UPDATE company
router.delete("/companies/:id", deleteCompany);  // DELETE company

// -------- OFFERS (generated letters) ----------
router.get("/", getOffers);                      // GET all offers (optional)
router.post("/", createOffer);                   // CREATE offer
router.delete("/:id", deleteOffer);              // DELETE offer

export default router;
