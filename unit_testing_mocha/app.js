import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { employeeRouter } from "./src/routes/employee_routes.js";

export const app = express();
// middlewares
app.use(express.json());
app.use(cors());

async function connectToDB() {
    await mongoose.connect('mongodb://127.0.0.1/sept_2024');
    console.log('Database connection established')
}
app.use('/employees', employeeRouter)
app.listen(5000, async () => {
    await connectToDB();
    console.log('app running at 5000')
});

