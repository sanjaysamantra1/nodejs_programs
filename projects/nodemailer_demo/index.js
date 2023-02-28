const express = require("express");
const sendMail = require("./sendMail");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server Running Fine");
});
app.get("/sendMail", sendMail);

const start = async () => {
  try {
    app.listen(5000, () => {
      `Server listening on port ${PORT}`;
    });
  } catch (err) {
    console.log(err);
  }
};
start();
