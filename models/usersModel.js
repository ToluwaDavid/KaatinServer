const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    address: String,
    password: String,
    role: String,
    company: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // ← optional but useful
);

module.exports = mongoose.model("User", userSchema);
