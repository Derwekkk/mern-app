// backend/models/Agent.js
const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true }, // include country code
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", AgentSchema);
