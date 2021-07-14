import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectDB();

let server = app.listen(PORT, () => {
  console.log(`Server running on Port http://localhost:${PORT}`);
});

app.use(express.json());
app.use(cors());
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
