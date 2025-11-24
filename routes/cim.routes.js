// BACKEND/routes/cim.routes.js
import express from "express";
import {
  createCimContract,
  getCimContracts,
} from "../controllers/cim.controller.js";

const router = express.Router();

// GET all CIM contracts
router.get("/", getCimContracts);

// POST create one CIM contract
router.post("/", createCimContract);

export default router;
