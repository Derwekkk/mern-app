// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" }, // could be 'admin' or 'agent'
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
