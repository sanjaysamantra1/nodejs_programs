const { check, validationResult } = require("express-validator");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.send(`
  <form action="saveData" method="POST">
        <pre>
	Enter your Email : <input type="text" name="email"> <br>
	Enter your Name	 : <input type="text" name="name"> <br>
	Enter Mobile Number : <input type="number" name="mobile"> <br>
	Enter your Password : <input type="password" name="password"> <br>
	<input type="submit" value="Submit Form">
    </pre>
    </form>`);
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
    const errors = validationResult(req);
    console.dir(req.body);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      res.send("Successfully validated, No errors found");
    }
  }
);

app.listen(5000, () => {
  console.log("Server is Running on port-5000 http://localhost:5000");
});
