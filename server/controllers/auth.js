const Otp = require("../models/Otp")
const User = require("../models/User")
const otpGenerator = require("otp-generator")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Profile =require('../models/Profile')
const Session = require('../models/sessionModel')
const Post = require("../models/postModel")
require("dotenv").config()


exports.sendOtp = async(req,res)=>{
   try {
    const {email} = req.body
    const checkUserPresent = await User.findOne({email})
    if(checkUserPresent){
        res.status(401).json({
                success:false,
                message:"user already exists"
            }
        ) 
    }

    var otp = otpGenerator.generate(6,
        {upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
        }  
       );

   const result = await Otp.findOne({otp})
   while(result){
    otp = otpGenerator.generate(5,
        {upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
        }); 
    result = await Otp.findOne({otp}); 
   }

   const otpPayLoad = {email,otp};
   const otpBody = await Otp.create(otpPayLoad)

   res.status(200).json({
    success:true,
    message:"OTP Sent Successfully",
    otp
})
   } catch (error) {
    
    return res.status(500).json({
        success:false,
        message:error.message
       }) 
   }

}

exports.signUp = async(req,res)=>{

    try {
       
        const {firstName,
            lastName,
            email,
            password,
            accountType,
            otp}=req.body;
  
 
        if(!firstName || !lastName || !email || !password  || !otp || !accountType){
            res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
       
        const existingUser=await User.findOne({email});
        if(existingUser){
            res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
     
        if(recentOtp.length === 0 ){
            res.status(400).json({
                success:false,
                message:"OTP not present"
            })
        }
    
        
        else if(otp!=recentOtp[0].otp){
            res.status(400).json({
                success:false,
                message:"Invalid otp"
            })  
        }
        const hashPassword=await bcrypt.hash(password,10);
     
        const profileDetails = await Profile.create({
       gender:null,
       dateOfBirth:null,
       about:null,
       contactNumber:null
        })
  
 
        const user = await User.create({
           firstName,
           lastName,
           email,
           password:hashPassword,
           accountType,
           additionalDetails:profileDetails._id
        })
       
        res.status(200).json({
            success:true,
            message:"user registered successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"user registration failed please try again"
        })  
    }
}

exports.logIn = async(req,res)=>{
try {
    const {email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({
            success:true,
            message:"All fields are required"
        })
    }

    const user=await User.findOne({email});
        
            if(!user){
                return res.status(401).json({
                    success:false,
                    message:"User does not exist"
                })
            }

    const isPasswordMatched=await bcrypt.compare(password,user.password);
        
        if(isPasswordMatched){
            const payload={
                email:user.email,
                _id:user._id,
                accountType:user.accountType
            }
    
            const token=jwt.sign(payload,process.env.JWT_SECRET,
                {
                    expiresIn:"5d"
                });
    
           user.token=token;
           user.password=undefined;
    
           const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
           }
           return res.cookie("token",token,options).status(200).json({
            success:true,
            message:"user logged in successfully",
            user
           })  }
           else {
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
           }
} catch (error) {
    res.status(500).json({
        success:false,
        message:"login failed,please try again"
    })  
}

}

exports.getUserDetails = async(req,res)=>{
    try {
        const userId = req.user._id;
       
        const user = await User.findById(userId)
        .populate("additionalDetails")
        .populate("category").exec()
        return res.status(200).json({
           success:true,
           message:"User Details Fetched",
           data:user 
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to fetch user details",
         })
    }

}

exports.allUsers = async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  };
  
exports.mentors = async (req, res) => {
    const keyword = req.query.search
      ? {
        $and:[
            {accountType:"Mentor"},
            {

                $or: [
                    { firstName: { $regex: req.query.search, $options: "i" } },
                    { email: { $regex: req.query.search, $options: "i" } },
                ],
            }
        ]
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  };

exports.getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({_id:{$ne:req.user._id}})
       .populate("category").populate("additionalDetails").populate("mentees").populate("mentors").exec();
       const events = await Session.find().populate("mentor").populate("mentee").exec();
       const posts = await Post.find().populate("owner").exec()
       res.status(200).json({
        success:true,
        message:"All Users Fetched",
        data:{
            users,
            events,
            posts
        }
       })
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"Unable to fetch all users",
       }) 
    }
}

exports.myMentees = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("mentees").exec();
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Mentees fetched successfully",
            data: user.mentees,
        });
    } catch (error) {
        console.error("Fetching mentors error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch mentors",
        });
    }
};

exports.myMentors = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("mentors").exec();
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Mentors fetched successfully",
            data: user.mentors,
        });
    } catch (error) {
        console.error("Fetching mentors error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch mentors",
        });
    }
};

exports.changePass = async (req, res) => {
    try {
        const { oldPass, newPass } = req.body;
        if (!oldPass || !newPass) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        const userId = req.user._id;
        console.log(userId);
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // Check if the old password matches the current password
        console.log(user.password);
        const isMatch = await bcrypt.compare(oldPass, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);

        // Update the user's password using findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully!",
            updatedUser, // Optionally return the updated user data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Password update failed",
        });
    }
};