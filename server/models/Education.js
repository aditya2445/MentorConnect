const mongoose = require("mongoose")

const educationSchema = new mongoose.Schema({
    degree:{
        type:String
    },
    currentlyPursuing:{
        type:String
    },
    college:{
        type:String
    }
},{timestamps:true})
module.exports = mongoose.model("Education",educationSchema)