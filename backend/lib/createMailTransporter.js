const nodemailer = require("nodemailer");
const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "ATBCSKB@outlook.com",
      pass: "strong@123",
    },
  });
  return transporter;
}; //////
module.exports = { createMailTransporter };
