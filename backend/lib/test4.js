// var jpeg = require('jpeg-js');
 const fs=require('fs');
 const jsQR = require("jsqr");
// var jpegData = fs.readFileSync('/Users/karthikreddyvoddula/Documents/ATBCS/backend/tempimage/abc.jpeg');
// console.log(jpegData);
// var rawImageData = jpeg.decode(jpegData, {useTArray: true});
// console.log(rawImageData);
const image =fs.readFileSync('/Users/karthikreddyvoddula/Documents/ATBCS/backend/tempimage/abc.jpeg');
png = require("png-js")
console.log(image);
const data = png.decode('/Users/karthikreddyvoddula/Documents/ATBCS/backend/tempimage/abc.jpeg');
    const out = {
      data: new Uint8ClampedArray(png.toRGBA8(data)[0]),
      height: data.height,
      width: data.width,
    };

    const code = jsQR(out.data, out.width, out.height);
// const converted =new Uint8ClampedArray(image)
// const code = jsQR(converted );

// if (code) {
//   console.log("Found QR code", code);
// }