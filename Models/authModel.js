const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const authSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "your username is required"],
    unique: true,
    minlength: 3,
    maxlength: 23,
  },
  password: {
    type: String,
    required: [true, "your password is required"],
    minlength: 8,
    maxlength: 24,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "passwords do not match",
    },
  },
});

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
authSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
