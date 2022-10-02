const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, required: true },
  remarks: { type: String, default: null },
  categoryId: { type: mongoose.Types.ObjectId, ref: "Category" },
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  likes: [],
  likescounter: { type: Number, default: 0 },
  resource: { type: String },
  isImage: { type: Boolean, default: true },
  status: { type: Boolean, default: false },
  reviews: [],
});

module.exports = mongoose.model("complaints", userSchema);
