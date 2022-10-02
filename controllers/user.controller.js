const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const FileHelper = require("../utils/fileHelper");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    let users = await User.find().select("-password");
    if (!users) {
      return res.status(400).json({ errors: [{ msg: "No Users" }] });
    }

    res.json({ msg: "success", data: users });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const getUser = async (req, res) => {
  try {
    let userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No User" }] });
    }
    res.json({ msg: "success", data: user });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const loginUserWithEmail = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User Not exist" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user._id,
        isAdmin: false,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 7200 },
      (err, token) => {
        if (err) throw err;

        res.json({ token, user });
      }
    );
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.file && FileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, gender, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      req.file && FileHelper.deleteFile(req.file.path);

      return res
        .status(400)
        .json({ errors: [{ msg: "User already exist with this email" }] });
    }

    user = new User({
      fullName,
      email,
      image: req.file ? req.file.path : null,
      gender,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
        isAdmin: false,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 7200 },
      (err, token) => {
        if (err) throw err;

        res.json({ token, user });
      }
    );
  } catch (error) {
    req.file && FileHelper.deleteFile(req.file.path);
    res.status(500).json({ errors: error.message });
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.file && FileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, gender } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      req.file && FileHelper.deleteFile(req.file.path);

      return res
        .status(400)
        .json({ errors: [{ msg: "User not exist exist with this email" }] });
    }

    user.fullName = fullName;
    user.gender = gender;
    user.image = req.file ? req.file.path : user.image;

    await user.save();

    res.status(200).json({ msg: "success", data: user });
  } catch (error) {
    req.file && FileHelper.deleteFile(req.file.path);
    res.status(500).json({ errors: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userid = req.params.id;

    await User.findByIdAndDelete(userid);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json({ message: "reset password" });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = {
  registerUser,
  getUser,
  getUsers,
  loginUserWithEmail,
  deleteUser,
  changePassword,
  updateUser
};
