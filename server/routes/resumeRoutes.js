const express = require('express');
const router = express.Router();
const {
    createResumeReview,
    getAllResumeReviews,
    updateResumeReview,
    deleteResumeReview
} = require('../controllers/resumeReviewController'); 
const {authMiddleware,isMentee,isMentor} = require("../middlewares/auth")

router.post('/create',authMiddleware,createResumeReview);
router.get('/all',authMiddleware,isMentor,getAllResumeReviews);
router.put('/resume-reviews/:resumeId',authMiddleware,isMentor,updateResumeReview);
router.delete('/resume-reviews/',authMiddleware,isMentee,deleteResumeReview);

module.exports = router;
