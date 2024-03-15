const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.send("User Added successfully");
  } catch (err) {
    console.log(err);
  }
});
app.post("/api/auth/login", async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user){
      res.send({ auth: false, msg: "No User Found,Please Register First" });
    }
    else {
      const passIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passIsValid) res.send({ auth: false, msg: "Invalid Password" });

      // in case both email & password are correct, generate token and send
      let token = jwt.sign({ id: user._id }, "mySecretCode", {
        expiresIn: 60 * 2, //  2 mins
      });
      res.send({ auth: true, token: token, expiresIn: 60 * 2 });
    }
  } catch (err) {
    res.send({ auth: false, token: "Error while login" });
  }
});

// Logout
app.get("/logout", (req, res) => {
  res.send("Logged out Successfully");
});

app.get("/api/auth/employees", async function (req, res) {
  let token = req.headers["my-token"];
  if (!token) res.send({ auth: false, token: "No Token Provided" });

  //jwt verify
  try {
    let user = jwt.verify(token, "mySecretCode");
    res.send({ auth: true, data: "this is the response from server" });
  } catch (err) {
    res.send({ auth: false, token: "Invalid Token" });
  }
});

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
