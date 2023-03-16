var express = require("express");
var cors = require("cors");
var app = express();

var corsOptions = {
  origin: "http://https://www.w3schools.com",
  // allow the requests from w3schools
};

app.get("/products/:id", cors(corsOptions), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
