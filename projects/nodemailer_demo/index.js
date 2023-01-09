var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "sanjaysamantra2@gmail.com",
    pass: "berhampur",
  },
});

var mailOptions = {
  from: "sanjaysamantra2@gmail.com",
  to: "sanjaysamantra1989@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
