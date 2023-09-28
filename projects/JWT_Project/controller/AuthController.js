const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const User = require("../model/userSchema");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all the users
router.get("/users", async (req, res) => {
  let users = await User.find({});
  res.send(data);
});

// Regsiter User
router.post("/register", (req, res) => {
  //encrypt password
  let hashpassword = bcrypt.hashSync(req.body.password, 8);
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      phone: req.body.phone,
      role: req.body.role ? req.body.role : "User",
    },
    (err, data) => {
      if (err) res.status(500).send("Error While Register");
      res.status(200).send("Registration Successful");
    }
  );
});

//login User
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.send({ auth: false, token: "Error while login" });
    if (!user)
      res.send({ auth: false, msg: "No User Found,Please Register First" });
    else {
      const passIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passIsValid) res.send({ auth: false, msg: "Invalid Password" });
      // in case both email & password are correct, generate token and send
      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60,
      });
      res.send({ auth: true, token: token, expiresIn: 60 * 60 });
    }
  });
});

// Logout
router.get("/logout", (req, res) => {
  let token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60,
  });
  res.send("Logged out Successfully");
});

//userInfo
router.get("/userInfo", (req, res) => {
  let token = req.headers["my-token"];
  if (!token) res.send({ auth: false, token: "No Token Provided" });
  //jwt verify
  jwt.verify(token, config.secret, (err, user) => {
    if (err) res.send({ auth: false, tokFen: "Invalid Token" });
    console.log(user);
    User.findById(user.id, (err, result) => {
      res.send(result);
    });
  });
});

module.exports = router;
