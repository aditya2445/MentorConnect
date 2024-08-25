const mongoose = require("mongoose");
const resumeReviewSchema = new mongoose.Schema({
    mentee: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    resumeUrl:{
        type:String,
        required:true,
    },
    feedback:{
        type:String,
    },
    status:{
        type:String,
        enum:["O","E","A"],
    }
},{timestamps:true})

const ResumeReview = mongoose.model("ResumeReview",resumeReviewSchema);

module.exports = {ResumeReview};