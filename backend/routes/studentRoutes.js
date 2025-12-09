const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Message = require("../models/Message");
// Add student (Admin)
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).json({ msg: "Student added, pending owner approval", student });
  } catch (err) {
    res.status(500).json({ msg: "Error adding student", error: err.message });
  }
});

// Get all students (Admin & Owner)
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Approve student (Owner)
router.get("/pending", async (req, res) => {
  try {
    const students = await Student.find({ status: "pending" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Approve student
router.put("/approve/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json({ msg: "Student approved", student });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/van-numbers", async (req, res) => {
  try {
    const vans = await Student.distinct("vanNumber");
    res.json(vans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/adminview", async (req, res) => {
  try {
    const { vanNumber } = req.query;

    let filter = {};
    if (vanNumber) filter.vanNumber = vanNumber;

    const students = await Student.find(filter)
      .sort({ createdAt: -1 });

    res.json(students);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Student login (only approved)
router.post("/login", async (req, res) => {
  try {
    const student = await Student.findOne({
      username: req.body.username,
      password: req.body.password
    });

    if (!student) return res.status(400).json({ msg: "Invalid credentials" });

    if (student.status !== "approved") {
      return res.status(403).json({ msg: "Owner approval required" });
    }

    res.json({
      msg: "Login successful",
      student: {
        studentName: student.studentName,
        studentId: student.studentId,
        vanNumber: student.vanNumber
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.post("/message", async (req, res) => {
  try {
    const { studentId, vanNumber, message } = req.body;
    const msg = await Message.create({ studentId, vanNumber, message });
    res.json({ msg: "Message sent", msg });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:vanNumber", async (req, res) => {
  try {
    const students = await Student.find({ vanNumber: req.params.vanNumber, status: "approved" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});
// GET all approved students
router.get("/approved", async (req, res) => {
  console.log("=== APPROVED STUDENT ROUTE HIT ===");

  try {
    const students = await Student.find({ status: "approved" });
    console.log("FOUND:", students.length);
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json({ msg: "Student updated", data: updated });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
