const { createMailTransporter } = require("./createMailTransporter");

const sendSuccessEmail = async (users) => {
  const transporter = await createMailTransporter();
  // var message=require('../mailbody/ticketConfirmation.html')
  //console.log(`${users.email}`);
  const name = users.name;
  const flightId = users.data.details.flightId;
  const arrival = users.data.details.from;
  const departure = users.data.details.to;
  // const arrives=users.data.details.arrives;
  //const departs=users.data.details.departs;
  let type = users.data.details.class;
  if (type == "fc") type = "First Class";
  else if (type == "bc") type = "Business Class";
  else if (type == "ec") type = "Economy";

  const date = users.data.details.date;
  const cost = users.flight_cost;

  const mailOptions = {
    from: '"Cloud9 Airlines" <ATBCSKB@outlook.com>',
    to: "vkr2471@gmail.com",
    subject: "Ticket Confirmation",
    //html: <p></p>
    attachments: [
      {
        filename: "Cloud9logo.png",
        path: "/Users/karthikreddyvoddula/Documents/ATBCS/backend/mailbody/Cloud9logo.png",
        cid: "Cloud9logo",
      },
    ],
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: ");
    }
  });
};

module.exports = { sendSuccessEmail };
