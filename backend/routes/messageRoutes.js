const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Student sends a message
// POST /api/messages
router.post("/", async (req, res) => {
  try {
    const { studentId, studentName, vanNumber, driverName, message } = req.body;

    const newMsg = new Message({
      studentId,
      studentName,
      vanNumber,
      driverName,
      message,
      read: false,
      timestamp: new Date()
    });

    await newMsg.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Driver fetch messages for their van
router.get("/:vanNumber", async (req, res) => {
  try {
    const messages = await Message.find({ vanNumber: req.params.vanNumber }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Driver marks message as read
router.put("/read/:messageId", async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.messageId, { read: true }, { new: true });
    res.json({ message: "Marked as read", data: msg });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin gets all messages
router.get("/admin/all", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
