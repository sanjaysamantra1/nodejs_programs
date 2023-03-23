const { body, validationResult } = require("express-validator");

const bodyparser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();

var PORT = process.env.port || 5000;

// View Engine Setup
app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.render("login");
});

// check() is a middleware used to validate
// the incoming data as per the fields
app.post(
  "/login",body('email').isEmail().normalizeEmail(),
  body('password').isLength({
      min: 6
  }),
  (req, res) => {
    // validationResult function checks whether
    // any occurs or not and return an object
    const errors = validationResult(req);

    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }

    // If no error occurs, then this
    // block of code will run
    else {
      res.send("Successfully validated");
    }
  }
);

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT ", PORT);
});
