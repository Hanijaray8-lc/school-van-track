const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// POST: Driver sends a report
router.post("/", async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.json({ message: "Report submitted successfully", data: report });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET: List unique drivers who submitted reports
router.get("/drivers/list", async (req, res) => {
  try {
    const drivers = await Report.aggregate([
      {
        $group: {
          _id: { driverName: "$driverName", vanNumber: "$vanNumber" }
        }
      }
    ]);

    res.json(drivers.map(d => ({
      driverName: d._id.driverName,
      vanNumber: d._id.vanNumber
    })));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Reports for specific driver
router.get("/driver/:driverName", async (req, res) => {
  try {
    const reports = await Report.find({
      driverName: req.params.driverName
    }).sort({ timestamp: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
