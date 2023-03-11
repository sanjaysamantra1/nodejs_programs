const express = require("express");
const app = express();

// Request time logger
app.use((req, res, next) => {
  console.log(`Request triggered at ${new Date().toLocaleTimeString()}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Middleware example!");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
