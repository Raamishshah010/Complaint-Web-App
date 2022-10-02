const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/user.controller");
const { check } = require("express-validator");
const auth = require("../Middlewares/auth");

router.get("/", userController.getUsers);
router.get("/:id", [auth], userController.getUser);

router.post(
  "/register",
  [
    check("fullName").not().isEmpty(),
    check("email", "email is not valid")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .isEmail()
      .normalizeEmail(),
    check("gender").not().isEmpty(),
  ],
  userController.registerUser
);
router.post(
  "/update",
  [
    check("fullName").not().isEmpty(),
    check("email", "email is not valid").isEmail().normalizeEmail(),
    check("gender").not().isEmpty()
  ],
  userController.updateUser
);

router.post(
  "/loginwithemail",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  userController.loginUserWithEmail
);
router.post(
  "/resetpassword",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  userController.changePassword
);

router.delete("/delete/:id", [auth], userController.deleteUser);

module.exports = router;
