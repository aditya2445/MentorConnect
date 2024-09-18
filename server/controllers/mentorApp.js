const Category = require("../models/Category");
const MentorApp = require("../models/MentorApp");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.createMentorApp = async(req,res)=>{
 try {
    
 const {firstName,lastName,image,address,category,skills,about,linkedInUrl,githubUrl,whyDoYouWantToBecomeMentor,achievements,jobTitle="",company=""} =  req.body;
 const userId = req.user._id;
    if(!firstName || !image || !lastName || !address || !category || !skills || !about || !linkedInUrl || !githubUrl || !whyDoYouWantToBecomeMentor || !achievements || !userId){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const mentor = await MentorApp.create({
        firstName:firstName,
        userId:userId,
        image:image,
        lastName:lastName,
        jobTitle:jobTitle,
        company:company,
        address:address,
        category:category,
        skills:skills,
        about:about,
        linkedInUrl:linkedInUrl,
        githubUrl:githubUrl,
        state:"Pending",
        whyDoYouWantToBecomeMentor:whyDoYouWantToBecomeMentor,
        achievements:achievements
    })
  
    res.status(200).json({
        success:true,
        message:"Mentor Application is Submitted",
        data:mentor
    })

 } catch (error) {
    res.status(500).json({
        success:"false",
        message:"something went wrong, while submitting application"
    })
 }
}

exports.checkMentorApp = async(req,res)=>{
try {
       const userId = req.user._id;
    
       const isMentorApplication = await MentorApp.findOne({userId:userId})?.populate("category").exec()
      
       if(!isMentorApplication){
        return res.status(400).json({
            success:false,
            message:"user Application is Unavailable"
        })
       }
       else{
        return res.status(200).json({
          success:true,
          message:"user Application fetched",
          data:isMentorApplication  
        })
       }
    
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"Unable to fetch the application", 
      }) 
}   
}

exports.getAllMentorsApp = async(req,res)=>{
    try {
        const pendingApps = await MentorApp.find({state:"Pending"}).populate("category").exec()
        const AcceptedApps = await MentorApp.find({state:"Accepted"}).populate("category").exec()
        const RejectedApps = await MentorApp.find({state:"Rejected"}).populate("category").exec()
        return res.status(200).json({
            success:true,
            message:"Mentor Applications fetched",
            data:{
                pendingApps,
                AcceptedApps,
                RejectedApps
            }
        })
    } catch (error) {
        return res.status(500).json({
          success:false,
          message:"Unable to fetch the applications",
        })
    }
}

exports.AcceptMentor = async(req,res)=>{
    try {
       const {MentorId,userId,firstName,lastName,image,jobTitle,company,address,linkedInUrl,githubUrl,skills,whyDoYouWantToBecomeMentor,about,achievements,category} = req.body;
       const user = await User.findByIdAndUpdate(userId,{
        firstName:firstName,
        lastName:lastName,
        image:image,
        accountType:"Mentor",
        category:category._id,
        skills:skills
       },{new:true})
       const profile = await Profile.findByIdAndUpdate(user.additionalDetails,{
       jobTitle:jobTitle,
       company:company,
       address:address,
       linkedInUrl:linkedInUrl,
       githubUrl:githubUrl,
       about:about,
       whyDoYouWantToBecomeMentor:whyDoYouWantToBecomeMentor,
       achievements:achievements
       },{new:true})

     const mentorApp = await MentorApp.findByIdAndUpdate(MentorId,{
       state:"Accepted"
     },{new:true})

      await Category.findByIdAndUpdate(category._id,{$push:{mentors:userId}},{new:true})

     return res.status(200).json({
        success:true,
        message:"Mentor Application Accepted",
     }) 
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"Unable to Accept Mentor Application", 
       })  
    }
}

exports.RejectMentor = async(req,res)=>{
    try {
        const MentorId = req.body.data;
        const mentorApp = await MentorApp.findByIdAndUpdate(MentorId,{
        state:"Rejected"
        },{new:true})
        return res.status(200).json({
        success:true,
        message:"Mentor Application Rejected",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to Reject Mentor Application",
        })
    }
}