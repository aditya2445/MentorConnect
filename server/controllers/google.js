const passport = require('passport');
const User = require('../models/User');
const Profile = require('../models/Profile');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
    passReqToCallback:true,
  },
  async(req,accessToken, refreshToken, profile, done)=> {
    const action = req.query.state
    let user = await User.findOne({googleId:profile.id})
    if(!user && action === "signup"){

        const profileDetails = await Profile.create({
            gender:"",
            dateOfBirth:"",
            contactNumber:"",
            about:""
        })
        let user = await User.create({
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            email:profile.emails[0].value,
            image:profile.photos[0].value,
            googleId:profile.id,
            additionalDetails:profileDetails._id,
            accountType:"Mentee"
        })
        return done(null,user)
     }
     else if(user && action==="signup"){
        return done(null,action)
     }
     else if(!user && action==="login"){
        return done(null,action);
     }
     else{
        return done(null,user,accessToken)
     }

  }
  
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});