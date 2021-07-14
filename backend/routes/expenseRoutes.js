import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expenseControllers.js";

const router = express.Router();

router.route("/").get(getExpenses).post(createExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);

export default router;
