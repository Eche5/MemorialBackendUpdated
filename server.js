const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("DB is running");
});

const PORT = 3500;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
