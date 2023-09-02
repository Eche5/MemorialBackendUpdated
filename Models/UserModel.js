const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your username"],
    minlength: 2,
    maxlength: 50,
  },
  tribute: {
    type: String,
    required: [true, "please write a tribute"],
    minlength: 2,
    maxlength: 40000,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
