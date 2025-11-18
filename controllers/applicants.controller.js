import Applicant from "../models/Applicant.js";
import Agent from "../models/Agent.js";
import Country from "../models/Country.js";
import { paginate } from "../utils/pagination.js";
import { passportStatus, policeStatus } from "../utils/dateUtils.js";

/* ---------------------------------------
   GET Applicants (first 10 OR all)
   WITH populate support
----------------------------------------- */
export const getApplicants = async (req, res) => {
  try {
    const { all } = req.query;

    // Paginate results
    const data = await paginate(Applicant, {}, 10, all === "true");

    // Populate each applicant manually (pagination-safe)
    const populatedResults = await Promise.all(
      data.results.map(async (app) => {
        const agent = app.agent ? await Agent.findById(app.agent) : null;
        const country = app.country ? await Country.findById(app.country) : null;

        return {
          ...app._doc,
          agent,
          country,
          passportValidity: passportStatus(app.passportExpiry),
          policeValidity: policeStatus(app.policeClearanceDispatch),
        };
      })
    );

    res.json({
      total: data.total,
      results: populatedResults,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------
   GET Applicant By ID (full profile)
----------------------------------------- */
export const getApplicant = async (req, res) => {
  const applicant = await Applicant.findById(req.params.id)
    .populate("agent")
    .populate("country");

  if (!applicant)
    return res.status(404).json({ message: "Applicant not found" });

  res.json({
    ...applicant._doc,
    passportValidity: passportStatus(applicant.passportExpiry),
    policeValidity: policeStatus(applicant.policeClearanceDispatch),
  });
};

/* ---------------------------------------
   CREATE Applicant
----------------------------------------- */
export const createApplicant = async (req, res) => {
  const body = req.body;

  const nameExists = await Applicant.findOne({ fullName: body.fullName });
  if (nameExists)
    return res.status(400).json({ message: "Full name already exists" });

  const passExists = await Applicant.findOne({ passportNo: body.passportNo });
  if (passExists)
    return res.status(400).json({ message: "Passport number already exists" });

  const newApplicant = await Applicant.create(body);

  res.json({ message: "Applicant created", applicant: newApplicant });
};

/* ---------------------------------------
   UPDATE Applicant
----------------------------------------- */
export const updateApplicant = async (req, res) => {
  const applicant = await Applicant.findById(req.params.id);
  if (!applicant)
    return res.status(404).json({ message: "Applicant not found" });

  Object.assign(applicant, req.body);
  await applicant.save();

  res.json({ message: "Applicant updated", applicant });
};

/* ---------------------------------------
   DELETE Applicant
----------------------------------------- */
export const deleteApplicant = async (req, res) => {
  await Applicant.findByIdAndDelete(req.params.id);
  res.json({ message: "Applicant deleted" });
};

/* ---------------------------------------
   GET Applicants By Country
----------------------------------------- */
export const getApplicantsByCountry = async (req, res) => {
  const applicants = await Applicant.find({ country: req.params.id })
    .populate("agent")
    .populate("country");

  res.json(applicants);
};

/* ---------------------------------------
   GET Applicants By Agent (NEW)
----------------------------------------- */
export const getApplicantsByAgent = async (req, res) => {
  const applicants = await Applicant.find({ agent: req.params.id })
    .populate("agent")
    .populate("country");

  res.json(applicants);
};

/* ---------------------------------------
   SEARCH Applicants (by name, passport, agent, country, progress)
----------------------------------------- */
export const searchApplicants = async (req, res) => {
  try {
    const { name, country, agent, progress } = req.query;

    // Build dynamic query filter
    const query = {};

    // 🔍 Name / general search
    if (name && name.trim() !== "") {
      const regex = new RegExp(name, "i");
      query.$or = [
        { fullName: regex },
        { passportNo: regex },
        { email: regex },
        { phone: regex },
      ];
    }

    // 🌍 Country filter
    if (country && country.trim() !== "") {
      query.country = country;
    }

    // 🧑‍💼 Agent filter
    if (agent && agent.trim() !== "") {
      query.agent = agent;
    }

    // ⚙️ Progress Status filter
    if (progress && progress.trim() !== "") {
      query.progressStatus = progress;
    }

    // If no valid filters provided → return 400
    if (Object.keys(query).length === 0) {
      return res
        .status(400)
        .json({ message: "Provide at least one search parameter" });
    }

    const applicants = await Applicant.find(query)
      .populate("agent")
      .populate("country")
      .limit(100);

    if (!applicants.length) {
      return res.status(404).json({ message: "No applicants found" });
    }

    // Add computed statuses (same as before)
    const enriched = applicants.map((app) => ({
      ...app._doc,
      passportValidity: passportStatus(app.passportExpiry),
      policeValidity: policeStatus(app.policeClearanceDispatch),
    }));

    res.json(enriched);
  } catch (error) {
    console.error("Applicant search error:", error);
    res.status(500).json({ message: "Server error during applicant search" });
  }
};
