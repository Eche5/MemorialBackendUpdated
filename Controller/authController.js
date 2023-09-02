const Auth = require("../Models/authModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};
exports.Register = async (req, res) => {
  try {
    const newUser = await Auth.create(req.body);
    res.status(200).json({
      status: `welcome ${req.body.username}`,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "username already exist",
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide username and password",
    });
  }

  try {
    const user = await Auth.findOne({ username }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({
        status: "failed",
        message: "Incorrect username or password",
      });
    } else {
      const token = signToken(user._id);
      return res.status(200).json({
        status: "success",
        token,
      });
    }
  } catch (error) {
    // Handle any potential errors here
    next(error);
  }
};
