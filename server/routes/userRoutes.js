const express = require("express");
const { sendOtp, signUp, logIn, getUserDetails,allUsers, mentors, getAllUsers, myMentors, myMentees, changePass } = require("../controllers/auth");
const {authMiddleware, isAdmin} = require("../middlewares/auth")
const route = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const { ContactUs } = require("../controllers/ContactUs");
require("dotenv").config()

route.post("/sendotp",sendOtp)
route.post("/signup",signUp)
route.post("/login",logIn)
route.get("/getUserDetails",authMiddleware,getUserDetails)
route.get("/",authMiddleware,allUsers)
route.get("/mentors",authMiddleware,mentors)
route.get("/getAllUsers",authMiddleware,isAdmin,getAllUsers)
route.get("/mymentors",authMiddleware,myMentors)
  route.get("/mymentees",authMiddleware,myMentees)
  route.post("/changepassword",authMiddleware,changePass)

route.get('/google/login',
    passport.authenticate('google', { scope: ['profile', 'email'],state:'login' })
  );

route.get('/google/signup',
    passport.authenticate('google', { scope: ['profile', 'email'],state:'signup' })
  );
  
route.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: `http://localhost:5173/login` }),
    (req, res) => {
      if(req.query.state==='login'){
        if(req.user==='login'){res.redirect(`http://localhost:5173/login?err=err`)}
       else { const payload={
           email:req.user.email,
            _id:req.user._id,
            accountType:req.user.accountType
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,
            {
                expiresIn:"5d"
            });
        res.redirect(`http://localhost:5173/login?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);}}
    else{
      if(req.user === 'signup'){
        res.redirect(`http://localhost:5173/signup?err=err`)
      }
       else res.redirect('http://localhost:5173/login');  
    }
    }
  );

  route.post("/contact-us",ContactUs)
  


module.exports = route