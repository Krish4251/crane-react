// netlify/functions/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const { email, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: 'krishparmar7317@gmail.com',
    subject: 'Message from Contact Form',
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email.' })
    };
  }
};
