const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },      // from student model
  studentName: { type: String, required: true },
  vanNumber: { type: String, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
  markedBy: { type: String, required: true },       // driver username or driver id

date: {
    type: String,
    default: () =>
      new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
  },

  time: {
    type: String,
    default: () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      })
  }

}, { timestamps: true });

attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
