import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    countryName: { type: String, unique: true, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Country", countrySchema);
