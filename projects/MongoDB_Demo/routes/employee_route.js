const express = require('express');
const { getAllEmployees, addEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employee_controller');
const employeeRouter = express.Router();

employeeRouter.get('/', getAllEmployees)
employeeRouter.get('/:id', getEmployeeById)
employeeRouter.post('/', addEmployee)
employeeRouter.patch('/:id', updateEmployee)
employeeRouter.delete('/:id', deleteEmployee)

module.exports = employeeRouter;
