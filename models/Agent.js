import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String },
    isSuper: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Agent", agentSchema);
