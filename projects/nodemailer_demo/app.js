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
  to: "sanjaysamantra1@gmail.com",
  subject: "Sending Email using NodeJs",
  text: "This is a test email, trying to send a test email from nodeJS",
};

transporter.sendMail(mailOption, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email Sent: ` + info.response);
  }
});
