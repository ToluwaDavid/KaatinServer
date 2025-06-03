const KaadUser = require("../models/usersModel");

// exports.getCardByEmail = async (req, res) => {
//   try {
//     const user = await KaadUser.findOneAndUpdate(
//       { email: req.params.email },
//       { $inc: { views: 1 } },
//       { new: true }
//     ).select("-password -secretAnswer");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Increment views
//     await KaadUser.findByIdAndUpdate(user._id, { $inc: { views: 1 } });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

exports.getCardByEmail = async (req, res) => {
  try {
    const user = await KaadUser.findOneAndUpdate(
      { email: req.params.email },
      { $inc: { views: 1 } },
      { new: true } // Return updated user
    ).select("-password -secretAnswer");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching card:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getCardBySlug = async (req, res) => {
  try {
    const user = await KaadUser.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    ).select("-password -secretAnswer");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // comes from requireAuth middleware

    const { firstname, lastname, role, company, address, phone, website } =
      req.body;

    const updatedUser = await KaadUser.findByIdAndUpdate(
      userId,
      {
        firstname,
        lastname,
        role,
        company,
        address,
        phone,
        website,
      },
      { new: true }
    ).select("-password -secretAnswer");

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res
      .status(500)
      .json({ message: "Failed to update profile", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await KaadUser.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching profile:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
