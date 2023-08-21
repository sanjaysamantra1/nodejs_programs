const express = require("express");
const userRouter = require("./user");
const productRouter = require("./product");

const app = express();

app.get("/", function (req, res) {
  res.send("Server running fine...");
  res.end();
});

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(5000, () => {
  console.log("Server listening at http://localhost:5000");
});
