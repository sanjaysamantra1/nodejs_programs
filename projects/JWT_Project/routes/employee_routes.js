const express = require('express');
const {authMiddleware} = require('../middlewares/auth_middleware');
const {logger} = require('../middlewares/logger_middleware');
const {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employee_controller');

const employeeRouter = express.Router();

employeeRouter.get('/', authMiddleware,logger,getAllEmployees)
employeeRouter.get('/:id', getEmployeeById)
employeeRouter.post('/', addEmployee)
employeeRouter.patch('/:id', updateEmployee)
employeeRouter.delete('/:id', deleteEmployee)

module.exports = employeeRouter;