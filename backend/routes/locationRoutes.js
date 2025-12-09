const express = require("express");
const Location = require("../models/Location");
const router = express.Router();

// Store live location
router.post("/", async (req, res) => {
  try {
    const { vanNumber, driverName, latitude, longitude } = req.body;

    // Update existing location or create if not exists
    const location = await Location.findOneAndUpdate(
      { vanNumber },              // filter by van
      { latitude, longitude, driverName, updatedAt: new Date() },  // update fields
      { upsert: true, new: true } // create if doesn't exist, return new doc
    );

    res.status(200).json({ msg: "Location updated", location });
  } catch (err) {
    res.status(500).json({ msg: "Error updating location" });
  }
});

// Fetch single driver location
router.get("/:vanNumber", async (req, res) => {
  try {
    const location = await Location.findOne({
      vanNumber: req.params.vanNumber,
    });

    if (!location) {
      return res.status(404).json({ message: "Van not found" });
    }

    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;   // <<<<<< REQUIRED
