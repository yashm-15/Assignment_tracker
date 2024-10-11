const express = require("express");
const router = express.Router();
const { auth, authorize } = require("../middleware/auth");
const Assignment = require("../models/Assignment");
const User = require("../models/User");

// Fetch all admins
router.get("/admins", auth, authorize(["user"]), async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upload an assignment
router.post("/upload", auth, authorize(["user"]), async (req, res) => {
  const { task, adminId } = req.body;
  if (!task || !adminId) {
    return res.status(400).json({ message: "Please provide task and adminId" });
  }
  try {
    // Check if admin exists
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(400).json({ message: "Invalid adminId" });
    }

    const assignment = new Assignment({
      userId: req.user._id,
      task,
      adminId,
    });
    await assignment.save();
    res
      .status(201)
      .json({ message: "Assignment uploaded successfully", assignment });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
