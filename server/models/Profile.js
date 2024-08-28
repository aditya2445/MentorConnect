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
}
},
{timestamps:true});

module.exports=mongoose.model("Profile",profileSchema);