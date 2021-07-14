import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js";
import { fetchExpenses } from "../utils/fetchExpenses.js";
import getCategoryName from "../utils/getCategoryName.js";

// @desc    Create new Expense
// @route   POST api/expenses/
// @access  Public
export const createExpense = asyncHandler(async (req, res) => {
  const { title, date, value, category } = req.body;
  try {
    const expense = await Expense.create({
      title,
      date,
      value,
      category,
    });
    if (expense) {
      const expenses = await fetchExpenses();
      res.json(expenses.reverse());
    } else {
      res.json({ error: "Failed to Create Expense" });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Update Expense
// @route   PUT api/expenses/:id
// @access  Public
export const updateExpense = asyncHandler(async (req, res) => {
  const { title, date, value, category } = req.body;
  try {
    const expense = await Expense.findById(req.params.id);

    if (expense) {
      expense.title = title;
      expense.catergory = category;
      expense.value = value;
      await expense.save();
      const expenses = await fetchExpenses();
      res.json(expenses.reverse());
    } else {
      res.json({ error: "Failed to Update Expense" });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Delete Expense
// @route   DELETE api/expenses/:id
// @access  Public
export const deleteExpense = asyncHandler(async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (expense) {
      await expense.remove();
      const expenses = await fetchExpenses();
      res.json(expenses.reverse());
    } else {
      res.json({ error: "Failed to Delete Expense" });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get All Expense
// @route   GET api/expenses/
// @access  Public
export const getExpenses = asyncHandler(async (req, res) => {
  try {
    const expenses = await fetchExpenses();
    res.json(expenses.reverse());
  } catch (error) {
    console.log(error);
  }
});
