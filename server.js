import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import corsOptions from "./config/cors.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import countriesRoutes from "./routes/countries.routes.js";
import agentsRoutes from "./routes/agents.routes.js";
import applicantsRoutes from "./routes/applicants.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import toolsRoutes from "./routes/tools.routes.js";
import passportRoutes from "./routes/passport.routes.js";
import policeRoutes from "./routes/police.routes.js";

// Cron job
import "./cron/cleanupTasks.js";
import "./cron/healthCheck.js";
dotenv.config();

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// ✅ Connect Database (safe)
connectDB().catch((err) => {
  console.error("❌ Database connection failed:", err.message);
  process.exit(1); // optional, prevents running without DB
});

// ✅ Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", time: new Date() });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/countries", countriesRoutes);
app.use("/api/agents", agentsRoutes);
app.use("/api/applicants", applicantsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/tools", toolsRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/police", policeRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});
// ✅ Error Handling
app.use(notFound); // 404 handler
app.use(errorHandler); // Global error handler

const PORT = process.env.PORT || 5000;

// ✅ Start Server (with safety)
const server = app.listen(PORT, () => {
  console.log(`🔥 Backend running on port ${PORT}`);
});

// ✅ Prevent crashes from unhandled errors
process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err);
  // Optionally, close server gracefully
});

process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
  // Prevent crash — log only
});
