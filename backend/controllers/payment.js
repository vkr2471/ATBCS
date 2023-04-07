const user = require("../../database/schemas/user.js");
const stripe = require("stripe");
const payment = async (req, res, next) => {
  //calculte flight cost here

  user1 = await user.findOne({ pl: req.params.id });

  if (!user1) {
    return res.send("oops something went wrong");
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Flight-Ticket",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5002/success/${user1.sl}`,
    cancel_url: "http://localhost:5002/cancel",
  });

  res.redirect(303, session.url);
};
module.exports = { payment };
