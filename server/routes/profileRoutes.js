const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middlewares/auth")

const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateDisplayPicture,
} = require("../controllers/profileController")

router.put("/updateProfile",authMiddleware,updateProfile);
router.delete("/deleteProfile", authMiddleware, deleteAccount)
router.get("/getUserDetails", authMiddleware, getAllUserDetails)
router.put("/updateDisplayPicture", authMiddleware, updateDisplayPicture)

module.exports = router;