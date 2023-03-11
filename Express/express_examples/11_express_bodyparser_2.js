var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, res) {
  res.sendFile(path.resolve("./login.html"));
});

// POST /login gets urlencoded bodies
app.post("/login", urlencodedParser, function (req, res) {
  res.send("welcome, " + req.body.username);
});

// POST /api/users gets JSON bodies
app.post("/api/users", jsonParser, function (req, res) {
  // create user in req.body
});

app.listen(5000, function () {
  console.log("Node server is running..");
});
