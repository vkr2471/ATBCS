const { createMailTransporter } = require("./createMailTransporter");
const user = require("../../database/schemas/user");
const forgotpassword = async (users) => {
  const transporter = await createMailTransporter();

  const mailOptions = {
    from: '"Cloud9 Airlines" <ATBCSKB@outlook.com>',
    to: users.email,
    subject: "Reset Password",
    html: `<p>Click <a href="http://localhost:3000/${users.email}/${users.emailToken}">here</a> to change your password</p>`,
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
module.exports = { forgotpassword };
