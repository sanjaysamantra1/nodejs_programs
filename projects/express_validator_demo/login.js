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
  res.render("login");
});

// check() is a middleware used to validate
// the incoming data as per the fields
app.post(
  "/login",
  [
    check("email", "Please Enter Valid Email").isEmail(),    
    check("password", "Password length should be minimum 8 characters").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    // checks if errors are there?
    const errors = validationResult(req);

    // If errors
    if (!errors.isEmpty()) {
      // res.status(400).json(errors);
      const alerts = errors.array();
      res.render("login", {alerts});
    }
    // if no errors
    else {
      res.send("Successfully validated");
    }
  }
);

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT ", PORT);
});
