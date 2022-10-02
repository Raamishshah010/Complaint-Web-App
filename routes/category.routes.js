const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { check } = require("express-validator");
const auth = require("../Middlewares/auth");

router.get("/", categoryController.getCategories);
router.get("/:id", [auth], categoryController.getCategory);

router.post(
  "/add",
  [auth],
  [check("title").not().isEmpty()],
  categoryController.registerCategory
);

router.post(
  "/update/:id",
  [auth],
  [check("title", "title is required").not().isEmpty()],
  categoryController.updateCategory
);

router.delete("/delete/:id", [auth], categoryController.deleteCategory);

module.exports = router;
