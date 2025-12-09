const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  address: { type: String },
  parentPhone: { type: String },
  busStop: { type: String },
  vanNumber: { type: String, required: true }, // dropdown from drivers
  classStandard: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Status for owner approval
  status: { type: String, enum: ["pending", "approved"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
