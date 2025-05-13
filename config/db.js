const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB Connected and live 🚀");
  } catch (error) {
    console.log("Mongo DB not connected ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
