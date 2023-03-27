const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

// Get path to image directory


const rename1 =async (req,res,next)=>{
    const imageDirPath = resolve(__dirname, '../images');

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath);

// Loop through each file that was retrieved
files.forEach(file => rename(
    
  imageDirPath + `/${file}`,
  imageDirPath + '/img.png',
  err => console.log(err)
));
next();
}


module.exports={rename1};