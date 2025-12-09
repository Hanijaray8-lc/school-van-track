const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  driverName: String,
  vanNumber: String,
  latitude: Number,
  longitude: Number,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", ReportSchema);
