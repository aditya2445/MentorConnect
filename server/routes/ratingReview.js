const express = require("express")
const router = express.Router()
const {createRating,getAverageRating,getAllRating} = require("../controllers/ratingAndReviewsController");
const { authMiddleware,isMentee } = require("../middlewares/auth")

router.post("/createRating", authMiddleware, isMentee, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router