import mongoose from 'mongoose'
const { Schema } = mongoose;
// create a schema
const employeeSchema = new Schema({
    eId: { type: Number, required: true },
    name: { type: String, required: true },
    sal: Number,
    gender: String
});
// Create a Model
export const EmployeeModel = mongoose.model('employees', employeeSchema);
