const express = require("express");
const app = express();
const users = ["Sachin", "Rahul", "Sourav", "Deepak"];

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/users", (req, res) => {
  res.render("users", { users });
});
app.listen(5000, () => {
  console.log("Server started at port 5000");
});
