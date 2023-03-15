const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const port = 5000;

app.get("/cars", (req, res) => {
  return res.json(["Mercedes", "BMW", "Toyota", "Audi"]);
});

app.listen(port, () => {
  console.log("   >  backend started...");
});
