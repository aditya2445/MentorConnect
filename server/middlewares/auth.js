const jwt = require("jsonwebtoken")
require('dotenv').config();

const User = require('../models/User');
const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
          }
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
          } catch (error) {
              return res.status(400).json({ message: 'Invalid token.' });
          }
          next();
    } catch (error) {
        return res.status(403).json({ message: 'something went wrong while validating the token'});
    }
}

const isMentee = async(req,res,next)=>{
    try {
        if(req.user.accountType !== "Mentee"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Mentee"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'user role cant be verified please try again'
        })
    }
}

const isMentor = async(req,res,next)=>{
    try {
        if(req.user.accountType !== "Mentor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Mentor"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'user role cant be verified please try again'
        })
    }
}

const isAdmin = async(req,res,next)=>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'user role cant be verified please try again'
        })
    }
}

module.exports = {authMiddleware,isMentee,isMentor,isAdmin};