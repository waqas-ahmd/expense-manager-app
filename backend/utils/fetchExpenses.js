import Expense from "../models/expenseModel.js";
import getCategoryName from "./getCategoryName.js";

export const fetchExpenses = async () => {
  var expenses = await Expense.find({});
  var updatedExpenses = [];
  for (let i = 0; i < expenses.length; i++) {
    let categoryName = await getCategoryName(expenses[i].category);
    updatedExpenses.push({
      _id: expenses[i]._id,
      title: expenses[i].title,
      category: expenses[i].category,
      value: expenses[i].value,
      date: expenses[i].date,
      categoryName,
    });
  }
  return updatedExpenses;
};
