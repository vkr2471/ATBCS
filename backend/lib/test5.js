const { createCanvas, loadImage } = require('canvas');
const { scanImageData } = require('@undecaf/zbar-wasm');
const jszip=require('jszip');
const {verifyJSON, init_signer} = require('certificate-signer-library');
(async (url) => {
  const
    img = await loadImage(url),
    canvas = createCanvas(img.width, img.height),
    ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0);

  const
    imageData = ctx.getImageData(0, 0, img.width, img.height),
    symbols = await scanImageData(imageData);
    // for (let i = 0; i < symbols.length; ++i) {
    //     const sym = symbols[i];
    
    //     (sym.decode())
    // }
   // const stringi=JSON.stringify(await symbols[0].decode());

  //const signedJSON=(JSON.parse(stringi));
result =await verifyJSON(await symbols[0].decode());
console.log(result);
}) ('/Users/karthikreddyvoddula/Documents/ATBCS/backend/tempimage/abc.png');



