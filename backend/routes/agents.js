// backend/routes/agents.js
const express = require("express");
const bcrypt = require("bcryptjs");
const Agent = require("../models/Agent");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/agents - create a new agent (admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Agent.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const agent = new Agent({ name, email, mobile, passwordHash });
    await agent.save();

    res.json({
      message: "Agent created",
      agent: { id: agent._id, name, email, mobile },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/agents - list all agents
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const agents = await Agent.find().select("-passwordHash");
    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
