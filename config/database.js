const mongoose = require("mongoose");

const localUrl = "mongodb://0.0.0.0:27017/ComplaintSystem";

exports.connect = () => {
  mongoose
    .connect(localUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};
