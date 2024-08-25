const Otp = require("../models/Otp")
const User = require("../models/User")
const otpGenerator = require("otp-generator")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Profile =require('../models/Profile')
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

exports.signUp=async(req,res)=>{

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
                res.status(401).json({
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
           res.cookie("token",token,options).status(200).json({
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
