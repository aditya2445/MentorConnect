const User = require("../models/User");

exports.fetchMentors = async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("mentors").exec()
        return res.status(200).json({
            success:true,
            message:"mentors fetched",
            data:user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to fetch mentors",
        })  
    }
}
exports.topMentors = async(req,res)=>{
    try {
        const users = await User.find({accountType:"Mentor"}).sort({"mentees":-1})
        return res.status(200).json({
            success:true,
            message:"mentors fetched",
            data:users
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to fetch mentors",
        })  
    }
}