const express = require("express");
const users = require("./users.json");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "https://www.w3schools.com",
  // allow the requests from w3schools
};

app.get("/users", cors(corsOptions), function (req, res, next) {
  res.json(users);
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
