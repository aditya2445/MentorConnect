import mongoose from "mongoose"
const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    },
    comment:{
        type:mongoose.Types.ObjectId,
        ref:"Comment"
    },
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Like = mongoose.model("Like",likeSchema);
module.exports = {Like};