const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
require("dotenv").config();
const cors = require("cors");
require("./config/database").connect();
app.use(bodyParser.urlencoded({ extended: true }));

//uploading product image to server
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-." + extension);
  },
});

// parse application/json
app.use(bodyParser.json());
app.use(express.json({ extended: true }));

app.use(multer({ storage: fileStorage }).single("file"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());

app.use("/", routes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Complaint App." });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
