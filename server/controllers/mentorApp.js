const MentorApp = require("../models/MentorApp");

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