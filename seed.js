import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Country from "./models/Country.js";
import Agent from "./models/Agent.js";

await connectDB();

console.log("🌱 Seeding started...");

// 1. CREATE ADMIN USER
const seedAdminUser = async () => {
  const adminExists = await User.findOne({ username: process.env.ADMIN_USERNAME });

  if (adminExists) {
    console.log("✔ Admin user already exists");
    return;
  }

  const newAdmin = await User.create({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });

  console.log("🔑 Admin user created:", newAdmin.username);
};

// 2. OPTIONAL: Seed default countries
const seedCountries = async () => {
  const list = ["Nepal", "Qatar", "UAE", "Saudi Arabia", "Malaysia"];

  for (const name of list) {
    const exists = await Country.findOne({ countryName: name });
    if (!exists) {
      await Country.create({ countryName: name });
      console.log(`🌍 Country added → ${name}`);
    }
  }
};

// 3. OPTIONAL: Seed agents
const seedAgents = async () => {
  const defaultAgents = [
    { name: "Main Agent", contact: "9800000000", isSuper: true },
    { name: "Default Agent", contact: "9800001111", isSuper: false }
  ];

  for (const ag of defaultAgents) {
    const exists = await Agent.findOne({ name: ag.name });
    if (!exists) {
      await Agent.create(ag);
      console.log(`🧑‍💼 Agent added → ${ag.name}`);
    }
  }
};

// EXECUTE SEEDERS
await seedAdminUser();
await seedCountries();
await seedAgents();

console.log("🌱 Seeding completed.");
mongoose.connection.close();
console.log("🔌 Database connection closed");
