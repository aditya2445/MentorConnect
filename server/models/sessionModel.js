const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    mentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    mentee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Scheduled","Completed","Cancelled"],
        default:'Scheduled',
    },

},{timestamps:true})

const Session = mongoose.model("Session",sessionSchema);
module.exports = Session;