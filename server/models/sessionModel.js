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
    topic:{
        type:String,
        required:true,
    },
    date:{
        type:date,
        required:true,
    },
    status:{
        type:String,
        enum:["Scheduled","Completed","Canccelled"],
        default:'Scheduled',
    },
    feedback:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Session = mongoose.model("Session",sessionSchema);
module.exports = Session;