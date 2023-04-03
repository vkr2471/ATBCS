// __ Importing jimp __ \\
const Jimp = require("jimp");

// __ Importing filesystem = __ \\
const fs = require('fs')

const JSZip = require('jszip');

// __ Importing qrcode-reader __ \\
const qrCodeReader = require('qrcode-reader');
 
// __ Read the image and create a buffer __ \\
const buffer = fs.readFileSync('/Users/karthikreddyvoddula/Documents/ATBCS/backend/mailbody/test.png');
// const zip = new JSZip();
// zip.loadAsync(buffer1).then((contents) => {
//     console.log( contents.files[CERTIFICATE_FILE].async('text'))
// })


 
// __ Parse the image using Jimp.read() __ \\
Jimp.read(buffer, function(err, image) {
    if (err) {
        console.error(err);
    }
// __ Creating an instance of qrcode-reader __ \\

    const qrCodeInstance = new qrCodeReader();

    qrCodeInstance.callback = function(err, value) {
        if (err) {
            console.error(err);
        }
// __ Printing the decrypted value __ \\
        console.log(value);
    };

// __ Decoding the QR code __ \\
    qrCodeInstance.decode(image.bitmap);
});