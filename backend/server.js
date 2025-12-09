const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app); // create HTTP server
const io = new Server(server, {
  cors: { origin: "*" }
});

// ===== Socket.IO =====
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("driver-location", (data) => {
  console.log("SERVER EMIT:", `van-${data.vanNumber}`, data);
  io.emit(`van-${data.vanNumber}`, data);
});

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
const driverRoutes = require("./routes/driverRoutes");
const locationRoutes = require("./routes/locationRoutes");
const studentRoutes = require("./routes/studentRoutes");
const AttendanceRoutes = require("./routes/attendanceRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/students", studentRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);

// ===== Connect MongoDB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ===== Start server =====
server.listen(5000, () => console.log("Server running on port 5000"));
