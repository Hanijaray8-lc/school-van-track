const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  vanNumber: { type: String, required: true },
  driverName: { type: String, required: true },
  routeName: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // important status
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});

module.exports = mongoose.model("Driver", DriverSchema);
