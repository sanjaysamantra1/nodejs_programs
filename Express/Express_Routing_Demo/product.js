const express = require("express");
const products = require("./products.json");
const productRouter = express.Router();

productRouter.route("/").get(function (req, res) {
  res.json(products);
});
productRouter.route("/details").get(function (req, res) {
  res.end("product Details Router Working");
});

module.exports = productRouter;
