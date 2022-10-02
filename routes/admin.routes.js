const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");


router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ errors: [{ msg: "User Not exist" }] });
      }
      if (admin.password !== password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const payload = {
        user: {
          id: admin._id,
          isAdmin: true,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;

          res.json({ token, admin });
        }
      );
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  }
);

module.exports = router;
