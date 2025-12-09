const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");


// 🟢 Add new driver (ADMIN adds)
router.post("/add", async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.json({ msg: "Driver added successfully, awaiting owner approval" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🟡 Get all pending drivers (OWNER sees requests)
router.get("/pending", async (req, res) => {
  try {
    const pendingDrivers = await Driver.find({ status: "pending" });
    res.json(pendingDrivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 Approve a driver (OWNER approves)
router.put("/approve/:id", async (req, res) => {
  try {
    await Driver.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ msg: "Driver approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all drivers (both pending & approved)
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ driverName: 1 });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/track", async (req, res) => {
  try {
    const drivers = await Driver.find({ status: "approved" })
      .select("driverName vanNumber"); // only send required fields

    res.json(drivers);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
});

// 🚀 Driver login (ONLY IF status = approved)
// 🚀 Driver login (ONLY IF status = approved)
router.post("/login", async (req, res) => {
  try {
    const driver = await Driver.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!driver) return res.status(400).json({ msg: "Invalid credentials" });

    if (driver.status !== "approved") {
      return res.status(403).json({ msg: "Owner approval required" });
    }

    // ====== SEND ONLY REQUIRED DATA ======
    res.json({
      msg: "Login successful",
      driver: {
        id: driver._id,
        vanNumber: driver.vanNumber,
        driverName: driver.driverName,
        username: driver.username
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/approved", async (req, res) => {
  try {
    const approved = await Driver.find({ status: "approved" });
    res.json(approved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
