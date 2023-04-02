const { createMailTransporter } = require("./createMailTransporter");
const user = require("../../database/schemas/user");
const sendVerificationMail = async (users) => {
  const transporter = await createMailTransporter();
  console.log(`${users.email}`);
  const mailOptions = {
    from: '"Cloud9 Airlines" <ATBCSKB@outlook.com>',
    to: users.email,
    subject: "Verify your email",
    html: `<p>Click <a href="http://localhost:3000/verify-email/${users.emailToken}">here</a> to verify your email</p>`,
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      const data = await user.findByIdAndDelete(users._id);
      console.log(error);
    } else {
      console.log("Message sent: ");
    }
  });
};
module.exports = { sendVerificationMail };
