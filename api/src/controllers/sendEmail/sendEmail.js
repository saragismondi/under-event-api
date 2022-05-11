const nodemailer = require("nodemailer");
const { emailModel } = require("./emailModel");

const { MAILUSER, MAILPASS } = process.env;

async function sendEmail(userEmail, content) {

  let transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: "under.event@yahoo.com", // generated ethereal user
      pass: "jskwweqqvshkicks", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: "under.event@yahoo.com", // sender address
    to: userEmail, // list of receivers
    subject: `Notificacion de tu compra UnderEventApp`, // Subject line
    text: "Compra UnderEventApp", // plain text body
    html: emailModel(content), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { sendEmail };