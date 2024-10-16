const path = require("path");
const ejs = require("ejs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sanjaysamantra2@gmail.com",
        pass: "vqnz angb vioh jbmu", // google app password
    }
});

function generateMailContent() {
    const templatePath = path.join(__dirname, 'emailTemplate.ejs');
    const data = { name: 'TestUser' }
    ejs.renderFile(templatePath, data, (err, contentFromEjsFile) => {
        if (err) {
            console.log(err)
        }
        let mailOptions = {
            from: 'sanjaysamantra2@gmail.com',
            to: ['pritampadhy@ymail.com', 'rangasravinandanahs@gmail.com', 'shindevilas1994@gmail.com'],
            subject: "Sending Email From NodeJS",
            html: contentFromEjsFile,
            attachments: [{ fileName: 'profile.png', path: './profile.png' }]
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log('email sent succesfully!!!')
            }
        })
    })
}

generateMailContent();
