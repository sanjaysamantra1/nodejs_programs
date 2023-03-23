const { check, validationResult } = require("express-validator");

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
  res.render("SampleForm");
});

// check() is a middleware used to validate
// the incoming data as per the fields
app.post(
  "/saveData",
  [
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 10,
      max: 20,
    }),
    check("mobile", "Mobile number should contains 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    check("password", "Password length should be 8 to 10 characters").isLength({
      min: 8,
      max: 10,
    }),
  ],
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
