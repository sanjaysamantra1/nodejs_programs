const employeeModel = require('../models/employee_model')

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        console.log(employees[0])
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Fetching Employees');
    }
}
exports.getEmployeeById = async (req, res) => {
    try {
        const employeeArr = await employeeModel.find({ eId: +req.params.id }); // find returns array
        if (!employeeArr.length) {
            return res.status(404).json({ 'message': 'employee not found' })
        } else {
            res.json(employeeArr[0])
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Fetching Employees');
    }
}
exports.addEmployee = async (req, res) => {
    try {
        const newEmployee = new employeeModel(req.body);
        const saveResponse = await newEmployee.save();
        res.status(201).json({ message: 'Employee added!!', newEmployee, saveResponse })
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: err.message });
    }
}
exports.updateEmployee = async (req, res) => {

}
exports.deleteEmployee = async (req, res) => {

}