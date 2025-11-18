const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR HANDLED:", err.message);
  
  // Handle mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "fail",
      message: `Invalid ${err.path} ID.`,
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((el) => el.message);
    return res.status(400).json({
      status: "fail",
      message: errors.join(", ") || "Validation failed.",
    });
  }

  // Handle duplicate key errors (MongoError 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: "fail",
      message: `${field} must be unique.`,
    });
  }

  // Handle missing required fields
  if (err.message?.includes("required")) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // Default fallback
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;

// ✅ Async wrapper export for convenience
export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
