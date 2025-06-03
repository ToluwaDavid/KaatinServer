const express = require("express");
const {
  getProfile,
  getCardByEmail,
  getCardBySlug,
  updateProfile,
} = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", requireAuth, getProfile);
router.get("/card/:email", getCardByEmail);
router.get("/card/slug/:slug", getCardBySlug);
router.put("/update", requireAuth, updateProfile);
router.get("/card", async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await KaadUser.findOne({ email }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

router.get("/home", (req, res) => {
  res.send("Welcome to Kadd backednd");
});

module.exports = router;
