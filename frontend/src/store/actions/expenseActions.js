import axios from "axios";
const api = "http://localhost:5000/api/expenses/";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createExpense = (expense) => async (dispatch) => {
  try {
    const { data } = await axios.post(api, expense, config);
    if (!data.error) dispatch({ type: "updateExpenseList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Create Expense" };
  }
};

export const updateExpense = (expense, id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${api}${id}`, expense, config);
    if (!data.error) dispatch({ type: "updateExpenseList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Update Expense" };
  }
};

export const deleteExpense = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${api}${id}`, config);
    if (!data.error) dispatch({ type: "updateExpenseList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Delete Expense" };
  }
};

export const getAllExpenses = () => async (dispatch) => {
  try {
    const { data } = await axios.get(api, config);
    if (!data.error) dispatch({ type: "updateExpenseList", data });
    return data;
  } catch (error) {
    return { error: "Failed to Fetch Expenses" };
  }
};
