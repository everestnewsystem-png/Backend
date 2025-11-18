import dotenv from "dotenv";

dotenv.config();

// Validate essential environment variables
const REQUIRED_KEYS = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];

REQUIRED_KEYS.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ WARNING: Missing environment variable → ${key}`);
  }
});

export default process.env;
