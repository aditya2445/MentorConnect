const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
mentors:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]
},{timestamps:true})

module.exports=mongoose.model("Category",categorySchema)