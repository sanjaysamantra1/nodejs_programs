import { employeeModel } from '../models/employee_model.js';
import { getFromCache, setInCache, redisClient } from '../utils/redis.js';

// Get all employees
export async function getAllEmployees(req, res) {
  const cacheKey = 'employees:all';
  const cachedEmployees = await getFromCache(cacheKey);

  if (cachedEmployees) {
    return res.json({ source: 'REDIS', data: cachedEmployees });
  }

  const employees = await employeeModel.find();
  await setInCache(cacheKey, employees);
  res.json({ source: 'DB', data: employees });
}

// Get employee by ID
export async function getEmployeeById(req, res) {
  const employeeId = Number(req.params.id);
  const cacheKey = `employee:${employeeId}`;

  const cachedEmployee = await getFromCache(cacheKey);
  if (cachedEmployee) {
    return res.json({ source: 'REDIS', data: cachedEmployee });
  }

  const employee = await employeeModel.findOne({ eId: employeeId });
  await setInCache(cacheKey, employee);
  res.json({ source: 'DB', data: employee });
}

// Create a new employee
export async function createEmployee(req, res) {
  const newEmployee = await employeeModel.create(req.body);

  // Refresh list cache
  const employees = await employeeModel.find();
  await setInCache('employees:all', employees);

  // Add individual employee cache
  await setInCache(`employee:${newEmployee.eId}`, newEmployee);

  res.json({ message: 'Employee Created', data: newEmployee });
}

// Update an existing employee
export async function updateEmployee(req, res) {
  const employeeId = Number(req.params.id);

  const updatedEmployee = await employeeModel.findOneAndUpdate(
    { eId: employeeId },
    req.body,
    { new: true }
  );

  // Refresh list cache
  const employees = await employeeModel.find();
  await setInCache('employees:all', employees);

  // Update single employee cache
  await setInCache(`employee:${employeeId}`, updatedEmployee);

  res.json({ message: 'Employee Updated', data: updatedEmployee });
}

// Delete an employee
export async function deleteEmployee(req, res) {
  const employeeId = Number(req.params.id);

  const deletedEmployee = await employeeModel.findOneAndDelete({ eId: employeeId });

  // Refresh list cache
  const employees = await employeeModel.find();
  await setInCache('employees:all', employees);

  // Remove employee from cache
  await redisClient.del(`employee:${employeeId}`);

  res.json({ message: 'Employee Deleted', data: deletedEmployee });
}
