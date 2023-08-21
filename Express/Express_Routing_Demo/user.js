const express = require("express");
const userRouter = express.Router();

userRouter.route("/").get(function (req, res) {
  res.end("Users Router Working");
});
userRouter.route("/details").get(function (req, res) {
  res.end("User Details Router Working");
});

module.exports = userRouter;
