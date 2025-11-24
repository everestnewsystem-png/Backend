// controllers/offer.controller.js
import { OfferCompany, Offer } from "../models/Offermodel.js";

// ================= COMPANY CONTROLLERS ==================

export const getCompanies = async (req, res) => {
  try {
    const companies = await OfferCompany.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ message: "Error fetching companies" });
  }
};

export const createCompany = async (req, res) => {
  try {
    const company = await OfferCompany.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    console.error("Error creating company:", err);
    res.status(400).json({ message: "Error creating company" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await OfferCompany.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (err) {
    console.error("Error updating company:", err);
    res.status(400).json({ message: "Error updating company" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await OfferCompany.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted" });
  } catch (err) {
    console.error("Error deleting company:", err);
    res.status(400).json({ message: "Error deleting company" });
  }
};

// ================= OFFER (GENERATED LETTER) CONTROLLERS ==================

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate("company")
      .sort({ createdAt: -1 });

    res.json(offers);
  } catch (err) {
    console.error("Error fetching offers:", err);
    res.status(500).json({ message: "Error fetching offers" });
  }
};

export const createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json(offer);
  } catch (err) {
    console.error("Error creating offer:", err);
    res.status(400).json({ message: "Error creating offer" });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json({ message: "Offer deleted" });
  } catch (err) {
    console.error("Error deleting offer:", err);
    res.status(400).json({ message: "Error deleting offer" });
  }
};
