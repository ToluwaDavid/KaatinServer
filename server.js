const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const routes = require("./routes");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use(cookieParser());

const allowedOrigins = [process.env.DEV_URL, process.env.CLIENT_URL];
//Setting up CORS
app.use(
  cors({
    //origin: process.env.DEV_URL,
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

//Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` App is up and runnig on ${PORT}`));
