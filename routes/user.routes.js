const express = require("express");
const { getProfile } = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();
router.get("/profile", requireAuth, getProfile);
router.get("/card/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    name: user.name,
    role: user.role,
    company: user.company,
    email: user.email,
    address: user.address,
    cardId: user._id,
  });
});

router.get("/home", (req, res) => {
  res.send("Welcome to Kadd backednd");
});

module.exports = router;
