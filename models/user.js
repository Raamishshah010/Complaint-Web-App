const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("user", userSchema);
