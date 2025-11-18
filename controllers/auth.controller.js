import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await user.matchPassword(password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  });
};
