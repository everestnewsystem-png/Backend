import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
      required: true
    },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    method: { type: String, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
