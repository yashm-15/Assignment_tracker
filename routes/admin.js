const express = require("express");
const router = express.Router();
const { auth, authorize } = require("../middleware/auth");
const Assignment = require("../models/Assignment");

// View assignments tagged to the admin
router.get("/assignments", auth, authorize(["admin"]), async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user._id })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Post api for accepting the assignment
router.post(
  "/assignments/:id/accept",
  auth,
  authorize(["admin"]),
  async (req, res) => {
    const assignmentId = req.params.id;

    try {
      const assignment = await Assignment.findOne({
        _id: assignmentId,
        adminId: req.user._id,
      });

      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      if (assignment.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Assignment already processed" });
      }
      assignment.status = "accepted";
      await assignment.save();

      res.json({ message: "Assignment accepted", assignment });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// post api for rejecting the assignment
router.post(
  "/assignments/:id/reject",
  auth,
  authorize(["admin"]),
  async (req, res) => {
    const assignmentId = req.params.id;

    try {
      const assignment = await Assignment.findOne({
        _id: assignmentId,
        adminId: req.user._id,
      });

      if (!assignment)
        return res.status(404).json({ message: "Assignment not found" });

      if (assignment.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Assignment already processed" });
      }

      assignment.status = "rejected";

      await assignment.save();

      res.json({ message: "Assignment rejected", assignment });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
