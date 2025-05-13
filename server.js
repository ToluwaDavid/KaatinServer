const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

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
//app.use();
//app.use();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` App is up and runnig on ${PORT}`));
