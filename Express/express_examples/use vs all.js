const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("middleware for all the routes");
  next();
});

app.use("/books", (req, res, next) => {
  console.log("middleware for /books using use()");
  next();
});

app.all("/books", (req, res, next) => {
  console.log("middleware for /books using all()");
  next();
});


app.get("/users", (req, res) => {
  res.send("Get All users");
});
app.get("/employees", (req, res) => {
  res.send("Get All Employees");
});
app.get("/books", (req, res) => {
  res.send("Get All Books");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
