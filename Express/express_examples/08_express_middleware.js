const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`Request trigger at ${new Date().toLocaleTimeString()}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Middleware example!");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
