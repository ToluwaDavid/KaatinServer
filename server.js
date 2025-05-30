const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const routes = require("./routes");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

//Setting up CORS
app.use(
  cors({
    origin: process.env.DEV_URL,
    credentials: true,
  })
);

//Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` App is up and runnig on ${PORT}`));
