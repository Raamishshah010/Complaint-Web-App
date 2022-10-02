const jwt = require("jsonwebtoken");
const fileHelper = require("../utils/fileHelper");

const auth = function (req, res, next) {
  const token = req.header("x-auth-header");
  if (!token) {
    req.file && fileHelper.deleteFile(req.file.path);
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    req.file && fileHelper.deleteFile(req.file.path);
    res.status(401).json({ msg: "Internal server Error" });
  }
};

module.exports = auth;
