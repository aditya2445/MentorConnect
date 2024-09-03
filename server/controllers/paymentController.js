const {instance} = require("../config/razorpay")
const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose");
const Premium = require("../models/premiumModel");
const crypto = require('crypto');
exports.capturePayment = async(req,res)=>{
    const {premId} = req.body;
    const userId = req.user._id;
    if(!premId){
        return res.status(400).json({ 
            success: false, 
            message: "Please Provide Course ID" 
        })
    }
    try {
        const premium = await Premium.findById(premId);
        if(!premium){
            return res
            .status(200)
            .json({ 
                success: false, 
                message: "Could not find the Course" 
            })
        }
        const uid = new mongoose.Types.ObjectId((String)(userId)) 
        const ownerId = premium.owner;
        const owner = await User.findById(ownerId);
        if(owner.mentees.includes(uid)){
            return res
            .status(200)
            .json({ success: true, message: "Student is already Enrolled" })
        }
        var totalAmt = premium.price;
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
 
    const options = {
        amount: totalAmt * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }
    try {    
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success:true,
            data:paymentResponse,
        })
    } catch (error) {
        return res.status(500)
        .json({ 
            success: false, 
            message: "Could not initiate order." 
        })
    }
}

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, premium } = req.body;
  const userId = req.user._id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !premium || !userId) {
      return res.status(400).json({ success: false, message: "Payment Failed" }); // Changed status to 400 for bad request
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

  try {
      if (expectedSignature === razorpay_signature) {
          await enrollStudents(premium, userId, res);
          if (res.headersSent) {
              return; // Exit early if headers are already sent
          }
          return res.status(200).json({ success: true, message: "Payment Verified" });
      } else {
          return res.status(400).json({ success: false, message: "Payment Verification Failed" });
      }
  } catch (error) {
      console.error(error);
      if (!res.headersSent) {
          return res.status(500).json({ success: false, error: error.message }); // Return 500 for server error
      }
  }
}

const enrollStudents = async (premium, userId, res) => {
    if (!premium || !userId) {
        return res.status(400).json({ success: false, message: "Please Provide premiumID and User ID" });
    }
    
    try {
        // Find the premium section
   
        const prem = await Premium.findById(premium);
        if (!prem) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        const owner = prem.owner;
       
        // Check if the user is already enrolled
        const user = await User.findById(userId);
        if (user.mentors.includes(owner)) {
            return res.status(400).json({ success: false, message: "Student is already Enrolled" });
        }
     
        // Proceed with enrollment
        await User.findOneAndUpdate(
            { _id: owner },
            { $push: { mentees: userId } },
            { new: true }
        );
        await User.findOneAndUpdate(
            { _id: userId },
            { 
                $push: { mentors: owner },
            },
            { new: true }
        );

        // Send an email notification
        const emailResponse = await mailSender(
            user.email,
            `Successfully Enrolled into ${premium}`,
            "Thanks for joining us"
        );
        if (!emailResponse) {
            throw new Error('Email sending failed');
        }

        return res.status(200).json({ success: true, message: "Enrollment successful" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        "Thank you for joining us"
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }