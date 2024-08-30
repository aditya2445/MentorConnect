const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
  name:{
    type:String
  },
  projectImage:{
    type:String
  },
 description:{
    type:String
 },
 Link:{
    type:String
 }
    
},{timestamps:true})

module.exports = mongoose.model("Projects",projectSchema)