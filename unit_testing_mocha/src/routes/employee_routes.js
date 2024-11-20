import express from "express";
import { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee } from
    "../controllers/employee_controller.js";

export const employeeRouter = express.Router();

employeeRouter.get('/', getAllEmployees)
employeeRouter.get('/:id', getEmployeeById)
employeeRouter.post('/', addEmployee)
employeeRouter.patch('/:id', updateEmployee)
employeeRouter.delete('/:id', deleteEmployee)
