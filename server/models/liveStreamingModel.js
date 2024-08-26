const mongoose = require('mongoose');

const liveStreamingSchema = new mongoose.Schema({
    mentor:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
    },
    startTime:{
        type:Date,
        required:true,
    },
    participants:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        }
    ],
    status:{
        type:String,
        enum:["upcoming","live","ended"],
        default:"upcoming",
    },
},{timestamps:true});

const LiveStreaming = mongoose.model("LiveStreaming",liveStreamingSchema);

module.exports = {LiveStreaming};