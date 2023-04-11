const { createMailTransporter } = require("./createMailTransporter");
const user = require("../../database/schemas/user");
const refundmail = async (users,fare,discount) => {
  const transporter = await createMailTransporter();
//  console.log(`${users.email}`);
console.log(fare,discount);
  const mailOptions = {
    from: '"Cloud9 Airlines" <ATBCSKB@outlook.com>',
    to: users.email,
    subject: "Refund",
    html: `<p>You have been sucessfully refunded a sum of ₹${(fare-discount).toLocaleString("en-IN")},please check with your bank </p>`,
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
     // const data = await user.findByIdAndDelete(users._id);
      console.log(error);
    } else {
      console.log("Message sent: ");
    }
  });
};
module.exports = { refundmail };
