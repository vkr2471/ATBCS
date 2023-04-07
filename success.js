var fs = require('fs');
var pdf = require('html-pdf');
const qrcode=require('qrcode');
const {createMailTransporter}=require('./createMailTransporter');
const crypto = require('crypto');
const image=fs.readFileSync('/Users/karthikreddyvoddula/Documents/ATBCS/backend/lib/Cloud9logo.png').toString('base64')

const sendSuccessEmail=()=>
{
    usered={
        email:'vkr2471@gmail.com',
        bookingID:crypto.randomBytes(64).toString('hex')
    }

  qrcode.toFile(`/Users/karthikreddyvoddula/Documents/ATBCS/backend/Qr/${usered.email}.png`,`${usered.bookingID}` , {
        errorCorrectionLevel: 'H'
      }, function(err) {
        if (err) throw err;
        console.log('QR code saved!');
      });



    //   if(usered.data.trip=="oneway")
    //   {
        setTimeout(()=>{
            qr= fs.readFileSync(`/Users/karthikreddyvoddula/Documents/ATBCS/backend/Qr/${usered.email}.png`).toString('base64')
    
            const name= "karthik"//user1.name
           const email= "vkr2471@gmail.com"//user1.email
            const flightId= "23432"//user1.data.details.flightId
            const departure ="Delhi"//user1.data.details.from
            const arrival= "bombay"//user1.data.details.to
            const date= "12-04-2023"//user1.data.details.date
            const cost ="104531"//user1.flight_cost
         
         
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
         </html>`
         var options = { format: 'A4',
          };
         
         pdf.create(html, options).toFile(`/Users/karthikreddyvoddula/Documents/ATBCS/backend/Tickets/${usered.email}.pdf`, function(err, res) {
           if (err) return console.log(err);
           console.log(res); // { filename: '/app/businesscard.pdf' }
         })
         const transporter=createMailTransporter();
         const mailOptions = {
         
             from: '"Cloud9 Airlines" <ATBCSKB@outlook.com>',
             to: "vkr172003@gmail.com",
             subject: "Ticket Confirmation",
             html: "<p>Thank your for choosing cloud9 </p>",
             attachments: [
               {
                   filename:'Ticket.pdf',
                   path:`/Users/karthikreddyvoddula/Documents/ATBCS/backend/Tickets/${usered.email}.pdf`,
                   cid:'Cloud9logo'
               }
             ]
             
           };
           
           transporter.sendMail(mailOptions,  (error, info) => {
             if (error) {
               console.log(error);
             } else {
                 console.log(info)
               console.log("Message sent: ");
             }
           });
           //console.log("hello")
           //fs.unlinkSync(`/Users/karthikreddyvoddula/Documents/ATBCS/backend/Tickets/${usered.email}.pdf`)
           fs.unlinkSync(`/Users/karthikreddyvoddula/Documents/ATBCS/backend/Qr/${usered.email}.png`)
           
    
    
    
          },1000)

    //   }

    //   else{

    //   }


      
}

