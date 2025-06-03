const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    company: String,
    address: String,
    phone: String,
    website: String,
    secretAnswer: String, // for password recovery
    views: { type: Number, default: 0 },
    slug: { type: String, unique: true }, // For /@username
    template: { type: String, default: "default" }, // Theme name
  },
  {
    timestamps: true, // ← optional but useful
    collection: "kaadusers",
  }
);

module.exports = mongoose.model("kaadUser", userSchema);
