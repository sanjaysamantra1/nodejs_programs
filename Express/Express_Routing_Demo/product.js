const express = require("express");
const productRouter = express.Router();

productRouter.route("/").get(function (req, res) {
  res.end("products Router Working");
});
productRouter.route("/details").get(function (req, res) {
  res.end("product Details Router Working");
});

module.exports = productRouter;