const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "heather79@ethereal.email",
      pass: "pa27evgZN5JuEh7g68",
    },
  });

  let msgSent = await transporter.sendMail({
    from: "sanjaysamantra2@gmail.com",
    to: "sanjaysamantra1989@gmail.com",
    subject: "Sending Email using Node.js",
    text: "Demo Text....",
  });
  console.log("Message Sent Succesfully...");

  res.json(msgSent);
};
module.exports = sendMail;
