const express = require("express");
const app = express();

//  req => middleware => res

const loggerMiddleWare = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`Method: ${req.method}  URL: ${req.url}  Time: ${time}`);
  next();
};

app.get("/", loggerMiddleWare, (req, res) => {
  res.send("Home Route");
});
app.get("/about", loggerMiddleWare, (req, res) => {
  res.send("About-Us route");
});
app.get("/contact", (req, res) => {
  res.send("Contact Us Route");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
