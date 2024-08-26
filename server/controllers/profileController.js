const Profile = require("../models/Profile")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

const updateProfile = async(req,res) =>{
    try {
        const {fName="",lName="",dob="",about="",contactNumber="",gender=""} = req.body;
        const id = req.user._id;
        if(!contactNumber||!gender||!id){
            return res.status(400).json({
                success:false,
                message:"All Fields Are required"
            })
        }
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        profileDetails.dob = dob;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        const user = await User.findByIdAndUpdate(id,{
            firstName:fName,
            lastName:lName,
        }).populate("additionalDetails").exec();

        await user.save();
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"profile updation failed"
        })
    }
}

const getAllUserDetails = async(req,res)=>{
    try {
        const id = req.user._id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
            userDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const deleteAccount = async(req,res)=>{
    try {
        const id = req.user._id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id:id});
    
        //HW unenroll the user from all enrolled courses
        return res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"profile Deletion failed"
        })
    }
}

const updateDisplayPicture = async(req,res)=>{
    try {
        const pic = req.files.pic;
        const userId = req.user._id;
        console.log("reached");
        const image = await uploadImageToCloudinary(
            pic,
            process.env.FOLDER_NAME,
            1000,
            1000,
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })      
    }
}

module.exports = {updateProfile,getAllUserDetails,deleteAccount,updateDisplayPicture}