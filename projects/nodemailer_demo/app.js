let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanjaysamantra2@gmail.com",
    pass: "yjqjxzvnrgzyqyhu", // google App Password
  },
});

let mailOption = {
  from: "sanjaysamantra2@gmail.com",
  to: ["nayakakashjit@gmail.com", "asutoshsahu24@gmail.com"],
  subject: "Sending Email using NodeJs",
  // text:'This is a Test Email'
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
  attachments: [
    { filename: "profile.png", path: "./profile.png" }
  ],
};

transporter.sendMail(mailOption, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email Sent Succesfully: ` + info.response);
  }
});
