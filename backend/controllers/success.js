const user =require('../../database/schemas/user.js')

const success=async(req,res,next)=>{
    user1 =await user.findOne({sl:req.params.id})
    if(!user1)
    {
      return res.send("oops something went wrong")
    }
    //update ffm
    //update pl
    //update sl
    //remove PL , add it to bookings
    //reduce flight tickets 
    user1.ffm = 1;
    await user1.save()
    res.send("payment successful")
}
module.exports={success,};