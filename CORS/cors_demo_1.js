const express = require("express");
const app = express();
const port = 5000;

app.get("/cars", (req, res) => {
  return res.json(["Mercedes", "BMW", "Toyota", "Audi"]);
});

app.listen(port, () => {
  console.log("   >  backend started...");
});

//fetch("http://localhost:5000/cars").then(req => req.text()).then(console.log)
