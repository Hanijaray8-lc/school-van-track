const router = require("express").Router();
const Admin = require("../models/Admin");

// ====================
// Admin Signup
// ====================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const admin = new Admin({ username, email, password });
    await admin.save();

    res.json({ msg: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ====================
// Admin Login
// ====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });
    if (!admin) return res.status(400).json({ msg: "Invalid email or password" });

    res.json({
      msg: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ====================
// Get Admin (for edit page)
// ====================
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-__v");
    res.json(admin);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ====================
// Edit Admin (including password)
// ====================
router.put("/edit/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await Admin.findByIdAndUpdate(req.params.id, {
      username,
      email,
      password // <- direct password update
    });

    res.json({ msg: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;
