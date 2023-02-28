const express = require("express");
const app = express();

//  req => middleware => res

const logger = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`Method: ${req.method}  URL: ${req.url}  Time: ${time}`);
  next();
};

app.get("/", logger, (req, res) => {
  res.send("Home");
});
app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
