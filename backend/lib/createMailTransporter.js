const nodemailer = require('nodemailer');
const createMailTransporter=()=>
{
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'vkr2471@gmail.com',
            pass:'*aliB36@'
        }
    });
    return transporter;
};//////
module.exports={createMailTransporter};