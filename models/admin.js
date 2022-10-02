const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminschema);
