const mongoose = require("mongoose")

const mentorAppSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
  },
  image:{
    type:String
  },
  lastName:{
    type:String,
    required:true 
  },
   jobTitle:{
    type:String,
  },
   company:{
    type:String,
   },
   address:{
    type:String,
    required:true
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
   },
   skills:{
    type:String
   },
   about:{
    type:String
   },
   linkedInUrl:{
    type:String
   },
   githubUrl:{
    type:String
   },
   whyDoYouWantToBecomeMentor:{
    type:String
   },
   state:{
   type:String,
   enum:["Pending","Accepted","Rejected"]
   },
   achievements:{
    type:String
   },
},{timestamps:true})

module.exports = mongoose.model("MentorApp",mentorAppSchema)