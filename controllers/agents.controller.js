import Agent from "../models/Agent.js";
import Applicant from "../models/Applicant.js";

// =============================================
// GET ALL AGENTS (with assigned applicant count)
// =============================================
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });

    // Attach assigned applicants count
    const enriched = await Promise.all(
      agents.map(async (ag) => {
        const count = await Applicant.countDocuments({ agent: ag._id });
        return {
          ...ag._doc,
          applicantsCount: count,
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================================
// GET SINGLE AGENT (flattened + assigned count)
// =============================================
export const getAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    const assigned = await Applicant.countDocuments({ agent: agent._id });

    // frontend expects a flat object like:
    // { _id, name, contact, isSuper, applicantsCount }
    res.json({
      ...agent._doc,
      applicantsCount: assigned,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================================
// CREATE AGENT
// =============================================
export const createAgent = async (req, res) => {
  try {
    const { name, contact, isSuper } = req.body;

    const agent = await Agent.create({ name, contact, isSuper });
    res.json({ message: "Agent added", agent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================================
// UPDATE AGENT
// =============================================
export const updateAgent = async (req, res) => {
  try {
    const { name, contact, isSuper } = req.body;

    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    agent.name = name || agent.name;
    agent.contact = contact || agent.contact;
    agent.isSuper = isSuper ?? agent.isSuper;

    await agent.save();

    res.json({ message: "Agent updated", agent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================================
// DELETE AGENT
// =============================================
export const deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
