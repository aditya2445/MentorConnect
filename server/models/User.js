const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId:{
        type:String
    },
firstName:{
    type:String,
    required:true,
},
lastName:{
  type:String,
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
},
additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile",
    required:true
},
accountType:{
    enum:["Admin","Mentee","Mentor"],
    type:String,
    required:true
},
image:{
    type:String,
},
token:{
    type:String
},
resetPasswordExpires:{
    type:Date
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
},
skills:{
  type:String
},
mentees:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
mentors:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
events:[
    {
       type:mongoose.Schema.Types.ObjectId,
        ref:"Session"
    }
],
timeSlots:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"TimeSlots" 
    }
]
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)

//to be continued