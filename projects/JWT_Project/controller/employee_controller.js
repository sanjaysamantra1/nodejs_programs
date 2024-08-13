const { JWT_KEY } = require('../config/JWT_SECRET_KEY');
const employeeModel = require('../model/employee_model');
const jsonwebtoken = require('jsonwebtoken');


exports.getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find({});
        if (!employees) {
            return res.status(404).send('employees not found');
        }
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).send({ auth: false, token: "Invalid Token Provided" });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const eId = req.params.id;
        const foundEmployee = await employeeModel.findOne({ eId });
        if (!foundEmployee) {
            return res.status(404).send('employee not found');
        }
        res.status(200).json(foundEmployee);
    } catch (error) {
        res.status(500).send('Server error');
    }
};