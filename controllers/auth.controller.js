const KaadUser = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      role,
      company,
      address,
      phone,
      website,
      secretAnswer,
      slug,
    } = req.body;

    const existing = await KaadUser.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedAnswer = await bcrypt.hash(secretAnswer.toLowerCase(), 12);

    const user = await KaadUser.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      secretAnswer: hashedAnswer,
      slug,
      role,
      company,
      phone,
      website,
      address,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "✅ Registration successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🔑 Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await KaadUser.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({ message: "✅ Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const { email, secretAnswer, newPassword, confirmPassword } = req.body;

    if (!email || !secretAnswer || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await KaadUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(
      secretAnswer.toLowerCase(),
      user.secretAnswer
    );
    if (!isMatch)
      return res.status(401).json({ message: "Secret answer is incorrect" });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ message: "👋 Logged out successfully" });
};
