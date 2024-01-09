const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is running fine...");
});

// Multiple routing
const userRouter = express.Router();
const productRouter = express.Router();

userRouter.get("/", function (req, res) {
  res.end("Users Router Working");
});
userRouter.get("/details", function (req, res) {
  res.end("User Details Router Working");
});

productRouter.get("/", function (req, res) {
  res.end("products Router Working");
});
productRouter.get("/details", function (req, res) {
  res.end("product Details Router Working");
});

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
