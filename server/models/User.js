const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
firstName:{
    type:String,
    required:true,
},
lastName:{
  type:String,
  required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
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
}
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)

//to be continued