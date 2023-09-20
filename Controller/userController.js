const User = require("../Models/UserModel");

exports.createTribute = async (req, res) => {
  try {
    const { name, tribute } = req.body;
    const previous = await User.findOne({ tribute });
    if (!previous) {
      const newtribute = await User.create(req.body);
      res.status(200).json({
        status: "success",
        message: `${name}, thank you for posting your tribute`,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "tribute already posted",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getAllTributes = async (req, res) => {
  try {
    const tributes = await User.find();
    res.status(200).json({
      status: "success",
      data: tributes,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.getOneTribute = async (req, res) => {
  try {
    const id = req.params.id;
    const tributes = await User.findOne({ _id: id });
    console.log(tributes);
    res.status(200).json({
      tributes,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.editTributes = async (req, res) => {
  try {
    const tribute = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tribute) {
      res.status(400).json({
        status: "failed",
        message: `No tribute found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      message: "tribute updated",
      data: {
        data: tribute,
      },
    });
  } catch (error) {
    res.status(400).json({
      statsu: "failed",
      message: error.message,
    });
  }
};

exports.deleteTribute = async (req, res) => {
  const deleteTribute = await User.findByIdAndDelete(req.body.id);
  if (deleteTribute) {
    res.status(204).json({
      status: "success",
      data: null,
    });
  } else {
    res.status(400).json({
      status: "failed",
      message: "failed to delete file",
    });
  }
};
