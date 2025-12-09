const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },      // from student model
  studentName: { type: String, required: true },
  vanNumber: { type: String, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
  markedBy: { type: String, required: true },       // driver username or driver id

  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0] // yyyy-mm-dd
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString()
  }
}, { timestamps: true });

attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
