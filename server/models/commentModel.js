import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},
{
    timestamps:true
}
)

const Comment = mongoose.model("Comment",commentSchema);
module.exports = {Comment};