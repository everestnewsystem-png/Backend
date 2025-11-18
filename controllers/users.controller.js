import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: "Username already exists" });

  const user = await User.create({ username, password, role });

  res.json({ message: "User created", user });
};

export const updateUser = async (req, res) => {
  const { username, password, role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.username = username || user.username;
  if (password) user.password = password;
  user.role = role || user.role;

  await user.save();

  res.json({ message: "User updated", user });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
