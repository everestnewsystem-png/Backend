import mongoose from "mongoose";
import Task from "../models/Task.js";

// ✅ Fetch tasks for logged-in user (admin = all, user = own)
export const getTasks = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role !== "admin") {
      filter = { taskTo: new mongoose.Types.ObjectId(req.user._id) };
    }

    const active = await Task.find({ ...filter, isCompleted: false })
      .populate("taskTo", "username role")
      .sort({ createdAt: -1 });

    const completed = await Task.find({ ...filter, isCompleted: true })
      .populate("taskTo", "username role")
      .sort({ completedAt: -1 });

    res.json({ active, completed });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Admin creates task for specific user
export const createTask = async (req, res) => {
  try {
    const { taskTo, taskText } = req.body;
    if (!taskTo || !taskText)
      return res.status(400).json({ message: "taskTo and taskText required" });

    const task = await Task.create({
      taskTo,
      taskText,
      createdBy: req.user._id,
      isCompleted: false,
    });

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// ✅ Get task by ID (admin or assigned user)
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("taskTo", "username role");
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && String(task.taskTo._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to view this task" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Complete task (assigned user or admin)
export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && String(task.taskTo) !== String(req.user._id))
      return res.status(403).json({ message: "Unauthorized" });

    task.isCompleted = true;
    task.completedAt = new Date();
    await task.save();

    res.json({ message: "Task marked completed", task });
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({ message: "Error completing task" });
  }
};

// ✅ Uncomplete task
export const uncompleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && String(task.taskTo) !== String(req.user._id))
      return res.status(403).json({ message: "Unauthorized" });

    task.isCompleted = false;
    task.completedAt = null;
    await task.save();

    res.json({ message: "Task moved to active", task });
  } catch (error) {
    console.error("Error uncompleting task:", error);
    res.status(500).json({ message: "Error uncompleting task" });
  }
};

// ✅ Delete task (admin only)
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};
