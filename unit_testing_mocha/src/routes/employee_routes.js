const express = require('express');
const { getEmployees, getEmployeeById } = require('../controllers/employee_controller');

const employeeRouter = express.Router();

employeeRouter.get('/', getEmployees);
employeeRouter.get('/:id', getEmployeeById);

module.exports = employeeRouter;
