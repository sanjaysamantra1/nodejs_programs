const express = require("express");
const users = require("./users.json");
const userRouter = express.Router();

userRouter.route("/").get(function (req, res) {
  res.json(users);
});
userRouter.route("/details").get(function (req, res) {
  res.end("User Details Router Working");
});

module.exports = userRouter;
