import Applicant from "../models/Applicant.js";

// ✅ Bulk appointment setter
export const setAppointments = async (req, res) => {
  try {
    const { ids, appointmentDate } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No applicant IDs provided" });
    }

    if (!appointmentDate) {
      return res.status(400).json({ message: "Appointment date is required" });
    }

    // ✅ Bulk update applicants
    const result = await Applicant.updateMany(
      { _id: { $in: ids } },
      { $set: { appointmentDate } }
    );

    res.json({
      message: "Appointments updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error setting appointments:", error);
    res.status(500).json({ message: "Server error while updating appointments" });
  }
};

/* ---------------------------------------
   Bulk Progress Status Changer
----------------------------------------- */
export const progressChange = async (req, res) => {
  try {
    const { ids, progressStatus } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No applicant IDs provided" });
    }
    if (!progressStatus) {
      return res.status(400).json({ message: "Progress status required" });
    }

    await Applicant.updateMany(
      { _id: { $in: ids } },
      { $set: { progressStatus } }
    );

    res.json({ message: "Progress status updated successfully" });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error while updating progress" });
  }
};