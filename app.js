const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const tributerouter = require("./Routes/userRoutes");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});
//rate limiter
app.use(limiter);
app.set("trust proxy", "loopback");

app.use(cors());

app.use(express.json());

app.use("/api/v1/users", tributerouter);

module.exports = app;
