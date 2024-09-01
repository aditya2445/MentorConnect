const mongoose=require('mongoose')

const profileSchema=new mongoose.Schema({
gender:{
    type:String
},
dateOfBirth:{
    type:String
},
about:{
    type:String,
    trim:true
},
contactNumber:{
    type:String,
    trim:true
},
company:{
    type:String,
},
jobTitle:{
    type:String,
},
address:{
    type:String,
},
whyDoYouWantToBecomeMentor:{
    type:String,
    trim:true
},
achievements:{
    type:String
},
linkedInUrl:{
type:String
},
githubUrl:{
type:String
},
education:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Education"
},
projects:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Projects"
}]
},
{timestamps:true});

module.exports=mongoose.model("Profile",profileSchema);