const EmployeeModel  = require('../models/employee_model')

exports.getAllEmployees = async(req, res)=> {
    console.log('get all emps')
    try {
        const employees = await EmployeeModel.find({});
        if (!employees) {
            return res.status(404).send('Employees Not FOund')
        }
        return res.status(200).json(employees)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}
exports.getEmployeeById = async(req, res)=> {
    try {
        const empId = req.params.id;
        const employee = await EmployeeModel.findById(empId);
        console.log(empId,employee)
        if (!employee) {
            return res.status(404).send('Employee Not Found')
        }
        return res.status(200).json(employee)
    } catch (err) {
        return res.status(500).send('Server Error')

    }
}
exports.addEmployee = async(req, res)=> {
    const payload = req.body;
    try {
        let createResponse = await EmployeeModel.create(payload);
        if (createResponse) {
            res.json(createResponse);
        } else {
            res.status(404).json({ message: 'Employee Coulnt be added' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.updateEmployee = async(req, res)=> {
    let empId = req.params.id;
    const payload = req.body;
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(empId, payload, { new: true });
        if (updatedEmployee) {
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.deleteEmployee = async(req, res)=> {
    const empId = req.params.id;
    try {
        const employee = await EmployeeModel.findByIdAndDelete(empId);
        if (employee) {
            res.json({ message: 'Employee deleted' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}