const allowedOrigins = [
  process.env.CLIENT_URL,        // Netlify frontend
  "http://localhost:5173",       // Vite Dev mode
  "http://localhost:3000"        // Optional fallback
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked CORS origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export default corsOptions;
