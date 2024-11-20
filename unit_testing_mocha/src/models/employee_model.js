import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    eId: { type: String, required: true },
    name: { type: String, required: true },
    sal: Number,
    gender: String
});
// Create a Model
export const EmployeeModel = mongoose.model('employees', employeeSchema);
