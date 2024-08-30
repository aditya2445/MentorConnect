const ResumeReview = require("../models/resumeReviewModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const createResumeReview = async(req,res)=>{
    try {
        const resume = req.files.resume;
        const userId = req.user._id;
        if(!resume){
            return res.status(400).json({
                success:false,
                message:"resume is required"
            })
        }
        const resumeFile = await uploadImageToCloudinary(
            resume,
            process.env.FOLDER_NAME,
            1000,
            1000,
        )
        console.log(resumeFile);
        const resumeReview = await ResumeReview.create({
            mentee:userId,
            resumeUrl:resumeFile.secure_url,
            status:"NULL"
        })
        if(!resumeReview){
            return res.status(400).json({
                success: false,
                message: "resume Review Failed",
            });
        }
        res.status(201).json({
            success: true,
            message: "Resume review created successfully",
            data: resumeReview
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAllResumeReviews = async(req,res)=>{
    try {
        const allResumes = await ResumeReview.find({status:"NULL"}).populate("mentee","firstName email lastName image");
        if(!allResumes){
            return res.status(400).json({
                success:false,
                message:"cannot fetch all resumes"
            })
        }
        return res.status(200).json({
            success:true,
            message:"all resumes fetched successfully",
            data:allResumes
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const updateResumeReview = async (req, res) => {
    try {
        const { resumeId } = req.params; 
        const mentorId = req.user._id; 
        const { status,feedback,email } = req.body;
        console.log(resumeId);
        const updatedReview = await ResumeReview.findByIdAndUpdate(
            resumeId,
            {
                mentor: mentorId,
                status,
                feedback
            },
            { new: true} 
        ).populate("mentor mentee").exec();

        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message: "Resume review not found"
            });
        }
        //send a mail with feedback if needed
        const mailResponse=await mailSender(email,"Your Resume is being Reviewed",feedback);
        console.log(mailResponse);
        res.status(200).json({
            success: true,
            message: "Resume review updated successfully",
            data: updatedReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteResumeReview = async (req, res) => {
    try {
        const deletedReview = await ResumeReview.findByIdAndDelete(req.params.id);

        if (!deletedReview) {
            return res.status(404).json({
                success: false,
                message: "Resume review not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Resume review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {createResumeReview,getAllResumeReviews,updateResumeReview,deleteResumeReview}