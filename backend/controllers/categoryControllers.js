import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

// @desc    Create new Category
// @route   POST api/categories/
// @access  Public
export const createCategory = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  try {
    const category = await Category.create({
      title,
      description: description,
    });
    if (category) {
      const categories = await Category.find({});
      res.json(categories.reverse());
    } else {
      res.json({ error: "Failed to Create Category" });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Update Category
// @route   PUT api/categories/:id
// @access  Public
export const updateCategory = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      category.title = title;
      category.description = description;
      await category.save();
      const categories = await Category.find({});
      res.json(categories.reverse());
    } else {
      res.json({ error: "Failed to Update Category" });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Delete Category
// @route   DELETE api/categories/:id
// @access  Public
export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      const categories = await Category.find({});
      res.json(categories.reverse());
    } else {
      res.json({ error: "Failed to Delete Category" });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get All Category
// @route   GET api/categories/
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories) {
      res.json(categories.reverse());
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
  }
});
