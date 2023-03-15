const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.get("/cars", (req, res) => {
  return res.json(["Mercedes", "BMW", "Toyota", "Audi"]);
});
app.get("/users", cors(), (req, res) => {
  return res.json(["sachin", "Rahul", "Sourav"]);
});

app.listen(port, () => {
  console.log("   >  backend started...");
});
