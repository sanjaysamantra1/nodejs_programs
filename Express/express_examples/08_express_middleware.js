const express = require("express");
const app = express();

const myMiddleware = function (req, res, next) {
  console.log("Middleware Called...");
  console.log(req.url, req.method);
  next();
};
app.use(myMiddleware);

app.get("/", (req, res) => {
  res.send("Server Is Running...");
});
app.get("/home", (req, res) => {
  res.send("This is Home Route");
});
app.get("/users", (req, res) => {
  res.send("This is Users Route");
});
app.get("/products", (req, res) => {
  res.send("This is Products Route");
});

app.listen(5000, () => {
  console.log("server is listening at http://localhost:5000");
});
