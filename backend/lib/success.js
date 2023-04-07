var fs = require("fs");
var pdf = require("html-pdf");
const qrcode = require("qrcode");
const { createMailTransporter } = require("./createMailTransporter");
const crypto = require("crypto");
const path = require("path");

const image = fs
  .readFileSync(path.resolve(__dirname + "/Cloud9logo.png"))
  .toString("base64");

const sendSuccessEmail = (user1) => {
  // user1={
  //     email:'vkr2471@gmail.com',
  //     bookingID:crypto.randomBytes(64).toString('hex')
  // }

  qrcode.toFile(
    path.resolve(__dirname + `/../Qr/${user1.email}.png`),
    `${user1.data.bookingID}`,
    {
      errorCorrectionLevel: "H",
    },
    function (err) {
      if (err) throw err;
      console.log("QR code saved!");
    }
  );

  if(user1.data.trip=="oneway")
  {

  setTimeout(() => {

    qr = fs
      .readFileSync(path.resolve(__dirname + `/../Qr/${user1.email}.png`))
      .toString("base64");
      console.log("creating mail")

    const name = user1.name;
    const email = user1.email;
    const flightId = user1.data.flightId;
    const departure = user1.data.details.from;
    const arrival = user1.data.details.to;
    const date = user1.data.details.date;
    const cost = user1.flight_cost;
    let type=user1.data.details.class
    if(type=="fc")
    {
        type="First Class"
    }
    else if(type=="bc"){
        type="Business Class"
    }
    else{
      type="Economy"
    }
    const passengers=user1.data.details.adults+user1.data.details.children+user1.data.details.infants

    var html = `<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Confirmation Mail</title>
     </head>
     <body>
         <div style="
             width:100%;
             margin-left: auto;
             margin-right: auto;">
             <div class="container" style="
             background-color: #aab6d2;
             width: 100%;
             ">
                 <div style="
                         position: relative;
                         justify-content: space-between;
                   
                         // display: flex;
                         // flex-direction: column;
                         
                         gap: 10%;
                         color: #fff;
                         background-color: #000;
                         height: 15%;">
                     <div style="padding:10px; margin-left:10%;">
                     <img src="data:image/jpeg;base64,${image}" alt="Cloud9-Airlines" style="
                         width: 100px;
                         height: 100px;
                         padding-top: 30px;
                         padding-bottom: 30px;
                         left: 20px;
                         ">
                     </div>
                     <div><h1 style="
                         font-size: 2rem;
                         font-family: 'fantasy';
                         font-weight: 600;
                         position: absolute;
                         top: 30%;
                         left: 40%;
                         transform: translate(-50%, -50%);">Cloud9 Airlines</h1></div>
                     
                 </div>
                 <div
                 style="
                 background-image: linear-gradient(to bottom right, #aab6d2 40%, #bcb8c5 60%);">
                     <h2 style="
                         font-size: 1.25rem;
                         font-family: 'fantasy';
                         font-weight:800;">Ticket Confirmation</h2>
                     <div style="
                             text-align: left;
                             padding-left: 30px;
                             padding-bottom: 30px;
                             ">
                         <p>
                             Dear ${name},
                         </p>
                         <div style="
                                 padding-left: 20px;">
                             <p>
                                 Thank you for booking with Cloud9 Airlines. Your booking has been confirmed.
                             </p>
                             <p>
                                 Your booking details are as follows:
                             </p>
                             <div style="padding-left: 30px;">
                                 <p>
                                     <span style="font-weight: 600;">Booking ID:</span> {{bookingId}}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Flight ID:</span> {flightId}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">To:</span> ${departure}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">From:</span> ${arrival}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Date:</span> ${date}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Class:</span> {type}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Departs:</span> {departs}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Arrives:</span> {arrives}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Number of Passengers:</span> {{pas}}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Total Cost:</span> ${cost}
                                 </p>
                             </div>
                             <p>
                                 Thank you for choosing Cloud9 Airlines.
                             </p>
                         </div>
                         <p>
                             Regards,
                         </p>
                         <p>
                             Cloud9 Airlines
                         </p>  
                         <div style="padding:10px;
                                     position: absolute;        
                                     top: 63%;
                                     left: 60%;
                         ">
                         <img src="data:image/jpeg;base64,${qr}" alt="Cloud9-Airlines" style="
                             width: 200px;
                             height: 200px;
                             padding-top: 30px;
                             padding-bottom: 30px;
                             left: 20px;
                             ">
                         </div>  
                     </div>
             </div>
         </div>
     </body>
     </html>`;
    var options = { format: "A4" };

    pdf
      .create(html, options)
      .toFile(
        path.resolve(__dirname + `/../Tickets/${user1.email}.pdf`),
        function (err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/app/businesscard.pdf' }
        }
      );
    const transporter = createMailTransporter();
    const mailOptions = {
      from: '"Cloud9 Airlines" <ATBCSKB@outlook.com>',
      to: user1.email,
      subject: "Ticket Confirmation",
      html: "<p>Thank your for choosing cloud9 </p>",
      attachments: [
        {
          filename: "Ticket.pdf",
          path: path.resolve(__dirname + `/../Tickets/${user1.email}.pdf`),
          cid: "Cloud9logo",
        },
      ],
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      console.log("hello");
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log("Message sent: ");
      }
    });
  }, 1000);
}
else
{
  setTimeout(() => {

    qr = fs
      .readFileSync(path.resolve(__dirname + `/../Qr/${user1.email}.png`))
      .toString("base64");
      console.log("creating mail")

    const name = user1.name;
    const email = user1.email;
    const flight_number1 = user1.data.flight_number1;
    const flight_number2=user1.data.flight_number2
    const departure = user1.data.details.from;
    const arrival = user1.data.details.to;
    const date1 = user1.data.details.date1;
    const date2=user1.data.details.date2
    const arrives1=user.data.details.arrives1
    const departs1=user.data.details.departs1
    const arrives=user.data.details.arrives
    const departs=user.data.details.departs1
    const cost = user1.flight_cost;
    var type = user1.data.details.class;
    if(type=="fc")
    {
      type="First Class"
    }
    else if(type=="bc"){
      type="Business Class"
    }
    else if(type=="ec"){
      type="Economy"
    }
    const passengers=user1.data.details.adults+user1.data.details.children+user1.data.details.infants

    var html = `<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Confirmation Mail</title>
     </head>
     <body>
         <div style="
             width:100%;
             margin-left: auto;
             margin-right: auto;">
             <div class="container" style="
             background-color: #aab6d2;
             width: 100%;
             ">
                 <div style="
                         position: relative;
                         justify-content: space-between;
                   
                         // display: flex;
                         // flex-direction: column;
                         
                         gap: 10%;
                         color: #fff;
                         background-color: #000;
                         height: 15%;">
                     <div style="padding:10px; margin-left:10%;">
                     <img src="data:image/jpeg;base64,${image}" alt="Cloud9-Airlines" style="
                         width: 100px;
                         height: 100px;
                         padding-top: 30px;
                         padding-bottom: 30px;
                         left: 20px;
                         ">
                     </div>
                     <div><h1 style="
                         font-size: 2rem;
                         font-family: 'fantasy';
                         font-weight: 600;
                         position: absolute;
                         top: 30%;
                         left: 40%;
                         transform: translate(-50%, -50%);">Cloud9 Airlines</h1></div>
                     
                 </div>
                 <div
                 style="
                 background-image: linear-gradient(to bottom right, #aab6d2 40%, #bcb8c5 60%);">
                     <h2 style="
                         font-size: 1.25rem;
                         font-family: 'fantasy';
                         font-weight:800;">Ticket Confirmation</h2>
                     <div style="
                             text-align: left;
                             padding-left: 30px;
                             padding-bottom: 30px;
                             ">
                         <p>
                             Dear ${name},
                         </p>
                         <div style="
                                 padding-left: 20px;">
                             <p>
                                 Thank you for booking with Cloud9 Airlines. Your booking has been confirmed.
                             </p>
                             <p>
                                 Your booking details are as follows:
                             </p>
                             <div style="padding-left: 30px;">
                                 <p>
                                     <span style="font-weight: 600;">Booking ID:</span> {{bookingId}}
                                 </p>
                                 <p>
                                 <span style="font-weight: 600;">Date:</span> ${date}
                             </p>
                                 <p>
                                     <span style="font-weight: 600;">Flight ID:</span> {flight_number}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">To:</span> ${departure}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">From:</span> ${arrival}
                                 </p>

                                 <p>
                                 <span style="font-weight: 600;">Departs:</span> {departs}
                             </p>
                             <p>
                                 <span style="font-weight: 600;">Arrives:</span> {arrives}
                               


                                 <p>
                                 <span style="font-weight: 600;">Return Journey</span> 
                                 < /p>

                                 <p>
                                 <span style="font-weight: 600;">Flight ID:</span> {flight_number}
                             </p>

                                 <p>
                                 <span style="font-weight: 600;">Date(return):</span> ${date1}
                                </p>
                                 
                              
                                 <p>
                                     <span style="font-weight: 600;">Class:</span> ${type}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Departs:</span> {departs1}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Arrives:</span> {arrives1}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Number of Passengers:</span> {{pas}}
                                 </p>
                                 <p>
                                     <span style="font-weight: 600;">Total Cost:</span> ${cost}
                                 </p>
                             </div>
                             <p>
                                 Thank you for choosing Cloud9 Airlines.
                             </p>
                         </div>
                         <p>
                             Regards,
                         </p>
                         <p>
                             Cloud9 Airlines
                         </p>  
                         <div style="padding:10px;
                                     position: absolute;        
                                     top: 63%;
                                     left: 60%;
                         ">
                         <img src="data:image/jpeg;base64,${qr}" alt="Cloud9-Airlines" style="
                             width: 200px;
                             height: 200px;
                             padding-top: 30px;
                             padding-bottom: 30px;
                             left: 20px;
                             ">
                         </div>  
                     </div>
             </div>
         </div>
     </body>
     </html>`;
    var options = { format: "A4" };

    pdf
      .create(html, options)
      .toFile(
        path.resolve(__dirname + `/../Tickets/${user1.email}.pdf`),
        function (err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/app/businesscard.pdf' }
        }
      );
    const transporter = createMailTransporter();
    const mailOptions = {
      from: '"Cloud9 Airlines" <ATBCSKB@outlook.com>',
      to: user1.email,
      subject: "Ticket Confirmation",
      html: "<p>Thank your for choosing cloud9 </p>",
      attachments: [
        {
          filename: "Ticket.pdf",
          path: path.resolve(__dirname + `/../Tickets/${user1.email}.pdf`),
          cid: "Cloud9logo",
        },
      ],
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      console.log("hello");
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log("Message sent: ");
      }
    });
  }, 1000); 
}

};
//sendSuccessEmail();
module.exports = { sendSuccessEmail };
