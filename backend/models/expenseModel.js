import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Category",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
