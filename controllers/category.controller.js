const Category = require("../models/category");
const { validationResult } = require("express-validator");

const getCategories = async (req, res) => {
  try {
    let categorys = await Category.find();

    if (!categorys) {
      return res.status(400).json({ errors: [{ msg: "No Categories" }] });
    }

    res.json({ msg: "success", data: categorys });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const getCategory = async (req, res) => {
  try {
    let CategoryId = req.params.id;
    let category = await Category.findById(CategoryId);
    if (!category) {
      return res.status(400).json({ errors: [{ msg: "No Category" }] });
    }
    res.json({ msg: "success", data: category });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const registerCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title } = req.body;

  try {
    let category = new Category({
      title,
    });

    await category.save();

    res.json({ msg: "success", data: category });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const CategoryID = req.params.id;

    await Category.findByIdAndDelete(CategoryID);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const updateCategory = async (req, res) => {
  const CategoryID = req.params.id;
  const title = req.body.title;

  try {
    const category = await Category.findById(CategoryID);

    if (!category) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No Category with this id" }] });
    }

    category.title = title;
    const updatedCtegory = await category.save();
    res.status(200).json({ message: "success", data: updatedCtegory });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = {
  registerCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
