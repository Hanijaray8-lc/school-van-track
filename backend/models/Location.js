const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  vanNumber: String,
  driverName: String,
  latitude: Number,
  longitude: Number,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Location", locationSchema);
