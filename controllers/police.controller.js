import Applicant from "../models/Applicant.js";

export const checkPoliceStatus = async (req, res) => {
  try {
    // Fetch all applicants with agent and country populated
    const applicants = await Applicant.find()
      .populate("agent")
      .populate("country");

    const now = new Date();

    const expiredPccs = [];
    const needReApply = [];
    const validPccs = [];
    const nopcc = [];

    applicants.forEach((a) => {
      // ✅ If PCC dispatch date is missing → add to nopcc
      if (!a.policeDispatchDate) {
        nopcc.push(a);
        return;
      }

      const daysDiff =
        (now - new Date(a.policeDispatchDate)) / (1000 * 60 * 60 * 24);

      // ✅ Apply rules
      if (daysDiff >= 180) {
        expiredPccs.push(a);
      } else if (daysDiff >= 91 && daysDiff <= 179) {
        needReApply.push(a);
      } else if (daysDiff >= 0 && daysDiff <= 90) {
        validPccs.push(a);
      }
    });

    res.json({
      expiredPccs,
      needReApply,
      validPccs,
      nopcc,
    });
  } catch (error) {
    console.error("Error checking PCC status:", error);
    res.status(500).json({ message: "Server error while checking PCC status" });
  }
};
