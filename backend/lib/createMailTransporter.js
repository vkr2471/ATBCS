const nodemailer = require("nodemailer");
const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vkr2471@gmail.com",
      pass: "pzauwybnyuhmvksn",
    },
  });
  return transporter;
}; //////
module.exports = { createMailTransporter };
