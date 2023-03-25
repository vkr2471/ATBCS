const schedule = require('../../database/schemas/schedule.js');


//////need to complete this once the database is ready
const findflights =async(req,res,next)=>
{
   const source =req.params.source;
   const destination =req.params.destination;
   const date =req.params.date;
   const type =req.params.type;
   const seats =req.params.seats;
   try{
    const day=await schedule.find({date:date});
    const dayflights=day.flights;
    const flightsfromto=dayflights.filter((flight)=>{
        return (flight.source===source && flight.destination===destination);
    });
    const availableflights=flightsfromto.filter((flight)=>{
        return (flight.totalseats[type]-flight.seatsbooked[type]>=seats);
    }
    );
    if(!availableflights){
        return res.status(404).send('no flights available');
    }
    res.staus(200).json({availableflights});

   }catch(error){
       res.staus(500).json({error:error.message})
   }
}