const express = require('express');
const router = express.Router();
const { capturePayment,verifyPayment, } = require('../controllers/paymentController');
const { authMiddleware } = require("../middlewares/auth")

router.post('/createOrder',authMiddleware, capturePayment);
router.post('/verify',authMiddleware,verifyPayment);

module.exports = router;