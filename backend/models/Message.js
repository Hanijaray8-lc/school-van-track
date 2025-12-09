const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  vanNumber: String,
  driverName: String,
  message: String,
  read: { type: Boolean, default: false },
  timestamp: Date
});

module.exports = mongoose.model("Message", MessageSchema);
