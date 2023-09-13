const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.get("/", function (req, res) {
  res.send("Server Running...");
});

app.get("/sendMail", async function (req, res) {
  // call createTransport()
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sanjaysamantra2@gmail.com",
      pass: "yjqjxzvnrgzyqyhu", // google App Password
    },
  });

  let mailInfo = {
    from: "sanjaysamantra2@gmail.com",
    to: ["dhiraj78725@gmail.com", "aditya229596@gmail.com"],
    subject: "Test Email Using NodeJS",
    html: `
        <h1>This is a Test Email</h1>
        <h3 style="color:red;text-align:center">Congratulations!!!</h3>
        <p>Please follow the instructions to claim your amount</p>

        <pre>
            Hello, world
            Hiiiii
            Good Morning
        </pre>
    `,
  };
  await transporter.sendMail(mailInfo);
  res.send("Mail Sent successfully");
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
