const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");
const employeeModel = require("./employeeModel");

const url = "mongodb://0.0.0.0:27017/march2023";
mongoose.connect(url);

app.get("/employees", async function (req, res) {
  let employees = await employeeModel.find({});
  res.json(employees);
});
app.get("/employees/:id", async function (req, res) {
  try {
    let employee = await employeeModel.findById(req.params.id);
    res.json(employee);
  } catch (err) {
    console.log(err);
  }
});
app.post("/employees", async function (req, res) {
  try {
    const newEmp = new employeeModel(req.body);
    await newEmp.save();
    res.send("Employee Added successfully");
  } catch (err) {
    console.log(err);
  }
});

app.get("/employees/:id", async function (req, res) {
  try {
    await employeeModel.remove({ id: req.params.id });
    res.send("Employee Deleted successfully");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
