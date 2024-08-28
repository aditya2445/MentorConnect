const RatingAndReviews = require("../models/ratingAndReviewModel")
const User = require("../models/User")
const mongoose = require("mongoose")

const createRating = async(req,res)=>{
    try {
        const userId = req.user._id;
        const {rating,review,mentorId} = req.body;
        const mentorDetails = await User.findOne({_id:mentorId});
        if(!mentorDetails){
            return res.status(404).json({
                success:false,
                message:"no mentor details",
            })
        }
        const alreadyReviewed = await RatingAndReviews.findOne({_id:userId,mentor:mentorId});
        if(alreadyReviewed){
            return res.status(404).json({
                success:false,
                message:"Course is already reviewed",
            })
        }
        const ratingReview = await RatingAndReviews.create({
            rating,review,mentor:mentorId,mentee:userId,
        })
        // console.log(updatedCourseDetails);
        return res.status(200).json({
            success:true,
            message:"Rating and review successfully created",
            data:ratingReview
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const getAverageRating = async(req,res)=>{
    try {
        const mentorId = req.body.mentorId;
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    mentor:new mongoose.Types.ObjectId(String(mentorId)),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message:"Average rating is 0 since no rating are given till now",
            averageRating:0,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const getAllRating = async(req,res)=>{
    try {
        const allReviews = await RatingAndReviews.find({}).sort({rating:"desc"}).populate(
            {path:"mentee",
                select:"firstname lastname email image"
            }
        ).populate({path:"mentor"}).exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

module.exports = {createRating,getAverageRating,getAllRating}