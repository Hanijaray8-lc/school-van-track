const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Driver = require("../models/Driver");


router.get("/students/:vanNumber", async (req, res) => {
  try {
    const students = await Student.find({
      vanNumber: req.params.vanNumber,
      status: "approved"
    });

    res.json(students);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { studentId, vanNumber, driverName, status } = req.body;

    // check student exists
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const driver = await Driver.findOne({ vanNumber });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    // create attendance
    const newAttendance = await Attendance.create({
      studentId,
      studentName: student.studentName,
      vanNumber,
      status,
      markedBy: driver.driverName
    });

    res.json({
      message: "Attendance marked successfully",
      attendance: newAttendance
    });

  } catch (err) {
    // duplicate same day error handling
    if (err.code === 11000) {
      return res.status(400).json({ message: "Attendance already marked today" });
    }

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});;


router.get("/student/:studentId", async (req, res) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentId })
      .sort({ date: -1 });

    res.json(records);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/history", async (req, res) => {
  try {
    const { vanNumber, driverName, date, status } = req.query;

    let filter = {};

    if (vanNumber) filter.vanNumber = vanNumber;
    if (driverName) filter.markedBy = driverName;
    if (date) filter.date = date;
    if (status) filter.status = status;

    const data = await Attendance.find(filter).sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/adminviewatten", async (req, res) => {
  try {
    const { vanNumber, date } = req.query;

    let filter = {};

    if (vanNumber) {
      filter.vanNumber = vanNumber;
    }

    if (date) {
      filter.date = date;
    }

    const records = await Attendance.find(filter).sort({ createdAt: -1 });
    res.json(records);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/van-numbers", async (req, res) => {
  try {
    const vans = await Attendance.distinct("vanNumber");
    res.json(vans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;