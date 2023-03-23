const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const employeeModel = require("./employeeModel");

const url = "mongodb://localhost:27017/march2023";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.get("/fetchEmps", function (req, res) {
  employeeModel.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
