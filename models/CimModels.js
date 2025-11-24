// BACKEND/models/CimModels.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cimContractSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "OfferCompany",
      required: true,
    },

    // gender + titles
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    englishtitle: { type: String, required: true }, // MR / MS-MRS
    romaniantitle: { type: String, required: true }, // Domnul / Doamna

    // applicant core info
    name: { type: String, required: true }, // CIMAPPLICANT.NAME
    country: { type: String, required: true }, // cimApplicant.country
    dob: { type: String, required: true }, // text
    birthplace: { type: String, required: true }, // CIMAPPLICANT.BIRTHPLACE
    passport: { type: String, required: true }, // CIMAPPLICANT.PASSPORT
    passportissuedby: { type: String, required: true },
    issuedate: { type: String, required: true },
    expirydate: { type: String, required: true },
    workpermitno: { type: String, required: true },
    workpermitdate: { type: String, required: true },
    cnp: { type: String, required: true },

    // job & salary
    jobtitle: { type: String, required: true }, // cimApplicant.jobtitle
    corcode: { type: String, required: true }, // cimApplicant.corcode
    grosssalary: { type: Number, default: 4050 }, // cimApplicant.grosssalary
    netsalary: { type: Number, default: 2574 }, // cimApplicant.netsalary

    // accommodation + dates/codes
    accommodationaddress: { type: String, required: true }, // cimapplicant.accommodationaddress
    comdate: { type: String, required: true }, // cimapplicant.comdate
    comCode: { type: String, required: true }, // cimapplicant.comCode
    gCode: { type: String, required: true }, // cimapplicant.gCode
    gdate: { type: String, required: true }, // cimapplicant.gdate

    // optional generated texts (for archive)
    contractText: { type: String },
    guaranteeText: { type: String },
    comodatText: { type: String },
  },
  { timestamps: true }
);

export const CimContract = model("CimContract", cimContractSchema);
