const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(to, message) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'recivers mail',
        subject: 'Notification',
        text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
}

module.exports = { sendEmail };
