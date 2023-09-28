const express = require("express");
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");
const userModel = require("./user-model");

const url = "mongodb://0.0.0.0:27017/march2023";
mongoose.connect(url);

app.get("/api/auth/users", async function (req, res) {
  let users = await userModel.find({});
  res.json(users);
});
app.post("/api/auth/register", async function (req, res) {
  req.body.password  = bcrypt.hashSync(req.body.password, 8);
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.send("User Added successfully");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
