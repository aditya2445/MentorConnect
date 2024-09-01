const express = require("express")
const router = express.Router()

const {
    createPremium,
    showAllPremium,
    getPremiumDetails,
    getOwnerPremiums,
    checkPurchaseStatus
  } = require("../controllers/premiumController")

  const { authMiddleware, isMentee, isMentor, isAdmin } = require("../middlewares/auth")

  router.post("/createPremium", authMiddleware, isMentor, createPremium)

  router.get("/getAllPremium", showAllPremium);

  router.get("/getPremiumDetails/:premiumId", getPremiumDetails);

  router.get("/getInstructorPremiums", authMiddleware, getOwnerPremiums);

  router.get('/check-purchase-status/:sectionId', authMiddleware,checkPurchaseStatus);
  module.exports = router;