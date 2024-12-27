const express = require('express');
const { getEmployees, getEmployeeById } = require('../controller/employee_controller');
const { authMiddleware } = require('../middlewares/auth_middleware');
const { logger } = require('../middlewares/logger_middleware');

const employeeRouter = express.Router();

employeeRouter.get('/', authMiddleware, logger, getEmployees);
employeeRouter.get('/:id', getEmployeeById);

module.exports = employeeRouter;
