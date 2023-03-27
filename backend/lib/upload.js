const multer =require('multer');
let path =require('path');
const storage=multer.diskStorage({
    destination:async(req,file,cb)=>{
        cb(null,path.join(__dirname,'../images'));
        filename:async(req,file,cb)=>{
                        cb(null,'img.png');
        }

 
    }
    
})

const upload =multer({storage:storage})

module.exports={upload};