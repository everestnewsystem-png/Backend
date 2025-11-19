import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL ;

// Function that checks the backend health route every 2 minutes
const runHealthCheck = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/health`);
    const { status, time } = response.data;

    if (status === "OK") {
      console.log(`💚 [HealthCheck] Server Healthy at ${time}`);
    } else {
      console.warn(`⚠️ [HealthCheck] Server responded with non-OK status: ${status}`);
    }
  } catch (error) {
    console.error(
      `❌ [HealthCheck] Server unreachable or unhealthy:`,
      error.message
    );
  }
};

// Run immediately when server starts
runHealthCheck();

// Repeat every 2 minutes (120000 ms)
setInterval(runHealthCheck, 180000);

console.log("⏱️ Health check cron started (every 16kms- minutes)");
