const {createMailTransporter}=require('./createMailTransporter');
const sendVerificationMail=async(user)=>{
    const transporter=await createMailTransporter();
    console.log(`${user.email}`)
    const mailOptions = {
        from:'"Cloud9 Airlines" <vkr2471@gmail.com>',
        to: user.email,
        subject: 'Verify your email',
        html:`<p>Click <a href="http://localhost:3000/verify-email/${user.emailToken}">here</a> to verify your email</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
        console.log('Message sent: ');
        }
    });
    
};
module.exports={sendVerificationMail};

