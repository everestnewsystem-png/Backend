// models/Offermodel.js
import mongoose from "mongoose";

// =============== OFFER COMPANY SCHEMA ===============
const OfferCompanySchema = new mongoose.Schema(
  {
    // offercompany.name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // offercompany.address
    address: {
      type: String,
      required: true,
      trim: true,
    },

    // offercompany.cui
    cui: {
      type: String,
      required: true,
      trim: true,
    },

    // offercompany.traderegno
    traderegno: {
      type: String,
      required: true,
      trim: true,
    },

    // offercompany.contact
    contact: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Director / legal representative name
    representative: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// =============== OFFER SCHEMA (generated offers) ===============
const OfferSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OfferCompany",
      required: true,
    },

    // Applicant data
    surname: { type: String, trim: true },
    firstname: { type: String, trim: true },
    birthplace: { type: String, trim: true },
    country: { type: String, trim: true },
    dob: { type: String, trim: true }, // keep as text input
    passportIssue: { type: String, trim: true },
    passportNo: { type: String, trim: true },
    address: { type: String, trim: true },

    // Job / contract data
    jobEnglish: { type: String, trim: true },
    jobRomanian: { type: String, trim: true },
    dutyHours: { type: Number, default: 8 },
    daysPerWeek: { type: Number, default: 5 },
    salary: { type: String, trim: true },
    offerDate: { type: String, trim: true },
    validUntil: { type: String, trim: true },
    noticeDays: { type: Number, default: 30 },

    // Final generated offer letter text (RO+EN)
    offerText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// =============== MODELS (ESM EXPORTS) ===============
export const OfferCompany = mongoose.model(
  "OfferCompany",
  OfferCompanySchema
);

export const Offer = mongoose.model("Offer", OfferSchema);
