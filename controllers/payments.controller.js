import Payment from "../models/Payment.js";
import Applicant from "../models/Applicant.js";

// ✅ Get recent payments (limit 10)
export const getRecentPayments = async (req, res) => {
  const payments = await Payment.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("applicantId");

  res.json(payments);
};

// ✅ Get all payments of a specific applicant
export const getApplicantPayments = async (req, res) => {
  const payments = await Payment.find({ applicantId: req.params.id })
    .populate("applicantId")
    .sort({ date: -1 });

  res.json(payments);
};

// ✅ SEARCH payments by applicant name
export const searchPayments = async (req, res) => {
  const { name } = req.query;
  if (!name) return res.json([]);

  // Find applicants with similar names
  const applicants = await Applicant.find({
    fullName: { $regex: name, $options: "i" },
  });

  const applicantIds = applicants.map((a) => a._id);

  // Find all payments linked to those applicants
  const payments = await Payment.find({ applicantId: { $in: applicantIds } })
    .populate("applicantId")
    .sort({ date: -1 });

  res.json(payments);
};

// ✅ Add a new payment
export const createPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.json({ message: "Payment added", payment });
};

// ✅ Update an existing payment
export const updatePayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: "Payment not found" });

  Object.assign(payment, req.body);
  await payment.save();

  res.json({ message: "Payment updated", payment });
};

// ✅ Delete a payment
export const deletePayment = async (req, res) => {
  await Payment.findByIdAndDelete(req.params.id);
  res.json({ message: "Payment deleted" });
};

// ✅✅✅ NEWLY ADDED FUNCTION BELOW ✅✅✅
// Get a single payment record by ID for editing
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.json(payment);
  } catch (error) {
    console.error("Error fetching payment record:", error);
    res.status(500).json({ message: "Server error" });
  }
};
