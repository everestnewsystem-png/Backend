import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    fullName: { type: String, unique: true, required: true, trim: true },
    passportNo: { type: String, unique: true, required: true, trim: true },

    dob: { type: Date, required: true },
    passportExpiry: { type: Date, required: true },

    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },

    contactMain: { type: String, required: true },
    contactSecondary: { type: String },

    gender: { type: String, enum: ["male", "female", "Male","Female", ], required: true },
    maritalStatus: { type: String, enum: ["single", "married", "Married","Single"], required: true },
        birthPlace: { type: String,  required: true },
    progressStatus: {
      type: String,
      enum: [
        "new",
        "init paid",
        "document sent",
        "submitted",
        "resubmitted",
        "permit received",
        "permit rejected",
        "embassy submitted",
        "appointment confirmed",
        "mail received",
        "visa rejected",
        "Visa stamped",
        "Flight Done",
        "cancelled"
      ],
      default: "new"
    },

    fatherName: String,
    motherName: String,
    company: String,
    fileNo: String,

    appointmentDate: Date,
    submittedDate: Date,
    physicalDate: Date,

    policeDispatchDate: Date
  },
  { timestamps: true }
);

// Indexes for fast search
applicantSchema.index({ fullName: "text", passportNo: "text" });

export default mongoose.model("Applicant", applicantSchema);
