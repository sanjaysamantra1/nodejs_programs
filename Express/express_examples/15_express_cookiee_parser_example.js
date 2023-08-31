const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.get("/setcookie", (req, res) => {
  res.cookie("age", "25");
  res.send("Cookie have been saved successfully");
});

app.get("/getcookie", (req, res) => {
  //show the saved cookies
  console.log(req.cookies);
  res.send(req.cookies);
});

app.get("/deletecookie", (req, res) => {
  //show the saved cookies
  res.clearCookie("age");
  res.send("Cookie has been deleted successfully");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
