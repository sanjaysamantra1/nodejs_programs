import express from 'express';
import {getAllEmployees,getEmployeeById,createEmployee,updateEmployee,deleteEmployee } from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/',createEmployee );
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;