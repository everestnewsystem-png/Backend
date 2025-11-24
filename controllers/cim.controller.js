// BACKEND/controllers/cim.controller.js
import { CimContract } from "../models/CimModels.js";
import { OfferCompany } from "../models/Offermodel.js";

export const createCimContract = async (req, res) => {
  try {
    const {
      companyId,
      gender,
      englishtitle,
      romaniantitle,
      name,
      country,
      dob,
      birthplace,
      passport,
      passportissuedby,
      issuedate,
      expirydate,
      workpermitno,
      workpermitdate,
      cnp,
      jobtitle,
      corcode,
      grosssalary,
      netsalary,
      accommodationaddress,
      comdate,
      comCode,
      gCode,
      gdate,
      contractText,
      guaranteeText,
      comodatText,
    } = req.body;

    if (!companyId) {
      return res.status(400).json({ message: "companyId is required" });
    }

    const company = await OfferCompany.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const cim = await CimContract.create({
      company: companyId,
      gender,
      englishtitle,
      romaniantitle,
      name,
      country,
      dob,
      birthplace,
      passport,
      passportissuedby,
      issuedate,
      expirydate,
      workpermitno,
      workpermitdate,
      cnp,
      jobtitle,
      corcode,
      grosssalary,
      netsalary,
      accommodationaddress,
      comdate,
      comCode,
      gCode,
      gdate,
      contractText,
      guaranteeText,
      comodatText,
    });

    return res.status(201).json(cim);
  } catch (err) {
    console.error("createCimContract error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCimContracts = async (_req, res) => {
  try {
    const list = await CimContract.find()
      .sort({ createdAt: -1 })
      .populate("company");
    return res.json(list);
  } catch (err) {
    console.error("getCimContracts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
