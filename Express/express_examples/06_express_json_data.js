const express = require("express");
const app = express();
const products = require("./assets/data/products");

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
