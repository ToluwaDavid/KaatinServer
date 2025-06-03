const express = require("express");
const {
  register,
  login,
  logout,
  recoverPassword,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/recover-password", recoverPassword);

module.exports = router;
