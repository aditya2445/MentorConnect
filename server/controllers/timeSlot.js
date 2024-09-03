
const Session = require("../models/sessionModel");
const TimeSlots = require("../models/TimeSlots");
const User = require("../models/User");


exports.createTimeSlot = async(req,res)=>{
   try {
    console.log(req.body)
     const {date1,date2} = req.body;
     const userId = req.user._id;

     const isTimeSlotExist = await TimeSlots.findOne({$and:[{mentor:userId},{start:new Date(date1)},{end:new Date(date2)}]})
     if(isTimeSlotExist){
      return res.status(400).json({
        success:false,
        message:"Time Slot Already exist"
      })
     }
     const isEventExist = await Session.findOne({$and:[{mentor:userId},{startDate:date1},{endDate:date2},{status:"Scheduled"}]})
     if(isEventExist){
      return res.status(400).json({
        success:false,
        message:"Event Already exist"
      })
     }

     const TimeSlot = await TimeSlots.create({
    start:new Date(date1),
    end:new Date(date2),
    mentor:userId
     })
   

     await User.findByIdAndUpdate(userId,{$push:{timeSlots:TimeSlot}},{new:true});
   return res.status(200).json({
     success:true,
     message:"time slot is created"
   })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"unable to create time slot"
      })
   }
}
exports.getTimeSlot = async(req,res)=>{
try {
    const {userId} = req.body;
    const timeSlots = await User.findById(userId).populate("timeSlots").exec();
    const upcomingTimeSlots = timeSlots.timeSlots;
    
    const time = upcomingTimeSlots.forEach(async(timeslot)=>{
      if(new Date(timeslot.start)<=Date.now())
        await TimeSlots.deleteOne({_id:timeslot._id})
    })

    const user = await User.findById(userId).populate("timeSlots").exec();
    return res.status(200).json({
        success:true,
        message:"time slot is fetched",
        data:user
      })
} catch (error) {
    return res.status(500).json({
        success:true,
        message:"Unable to fetch time slots",
      })
}
}