const User = require("../models/User")
const mailSender = require('../utils/mailSender')

exports.ContactUs = async(req,res)=>{
  try {
    const {firstName,lastName,email,message,contact=""} = req.body;
    if(!firstName || !lastName || !email || !message){
      req.status(400).json({
          success:true,
          message:"All fields are required"
      })
    }
    const user = await User.find({email:email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:"please Register First"
        })
    }
    await mailSender(email,"Mentify Response Team","Your response is Submitted, we will try to solve your issues as soon as possible")
    await mailSender(process.env.MAIL_USER,"User Response Received",message)
    
    return res.status(200).json({
       success:true,
       message:"user response submitted"
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Unable to submit the Response"
       }) 
  }

}