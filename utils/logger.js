export const log = (message, data = "") => {
  console.log(`📘 LOG: ${message}`, data || "");
};

export const errorLog = (message, error = "") => {
  console.error(`❌ ERROR: ${message}`, error || "");
};
