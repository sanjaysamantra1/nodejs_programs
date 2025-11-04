const { getDB } = require("../utils/db_utils")

exports.getAllEmployees = async (req, res) => {
    try {
        const db = getDB();
        const employees = await db.collection('employees').find().toArray();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Fetching Employees');
    }
}
exports.getEmployeeById = async (req, res) => {
    try {
        const db = getDB();
        const employees = await db.collection('employees').find({eId:+req.params.id}).toArray();
        res.json(employees[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Fetching Employees');
    }
}
exports.addEmployee = async (req, res) => {

}
exports.updateEmployee = async (req, res) => {

}
exports.deleteEmployee = async (req, res) => {

}