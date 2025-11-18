import Applicant from "../models/Applicant.js";

export const checkPassportStatuses = async (req, res) => {
  const applicants = await Applicant.find();

  const now = new Date();

  const expiredPassports = applicants.filter(a =>
    a.passportExpiry && new Date(a.passportExpiry) < now
  );

  const expiringSoon = applicants.filter(a => {
    if (!a.passportExpiry) return false;
    const diff = (new Date(a.passportExpiry) - now) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff < 360;
  });

  res.json({
    expiredPassports,
    expiringSoon
  });
};
