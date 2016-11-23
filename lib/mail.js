const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

function sendMail(user, done) {
  transporter.sendMail({
    to: user.email,
    from: `${process.env.GMAIL_USERNAME}@gmail.com`,
    subject: 'Thanks for registering!',
    text: `Hi ${user.username}, thanks for registering!

    Please Click on the link below to complete your registration process:
    https://wdi-go-app.herokuapp.com/#/confirm/${user.confirmationCode}

    Cheers!`
  },done);
}

module.exports = {
  sendMail
};
