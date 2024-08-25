const mongoose = require('mongoose');
const ratingAndReviewsSchema = new mongoose.Schema(
  {
    mentee:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
const RatingAndReviews = mongoose.model('RatingAndReviews', ratingAndReviewsSchema);
module.exports = RatingAndReviews;
