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
//  Define allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",                 // Local dev
  "http://localhost:3000",                 // Local dev (alternate port)
  "https://your-frontend.vercel.app",      // Vercel or similar
  "https://your-app-client.up.railway.app" // Replace with actual domain
];

//  Apply dynamic CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {

    
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("⛔ Blocked by CORS:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true, // Allow sending cookies or authorization headers
  })
);
//Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` App is up and runnig on ${PORT}`));
