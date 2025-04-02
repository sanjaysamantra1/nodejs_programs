const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    eId: { type: Number, required: true },
    name: { type: String, required: true },
    sal: { type: Number, required: true },
    gender: { type: String }
});
// Create a Model
const EmployeeModel = mongoose.model('employees', employeeSchema);
module.exports = EmployeeModel
