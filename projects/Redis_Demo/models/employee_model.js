import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  eId: Number,
  name: String,
  city: String,
  salary: Number
}, { collection: 'employees' });

export const employeeModel = mongoose.model('employee', employeeSchema);