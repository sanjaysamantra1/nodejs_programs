const express = require("express");
const app = express();

//  req => middleware => res

const middleware1 = (req, res, next) => {
  console.log(`This is middleware-1`);
  next();
};
const middleware2 = (req, res, next) => {
  console.log(`This is middleware-2`);
  next();
};
const middleware3 = (req, res, next) => {
  console.log(`This is middleware-3`);
  next();
};

app.get("/", (req, res) => {
  res.send("This is Home Page");
});
app.get("/about", middleware1, middleware2, (req, res) => {
  res.send("This is About Us Page");
});
app.get("/contact", middleware1, middleware2, middleware3, (req, res) => {
  res.send("his is Contact Us Page");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
