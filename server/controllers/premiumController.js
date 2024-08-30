const Premium = require("../models/premiumModel");
const User = require("../models/User");

const createPremium = async(req,res)=>{
    try {
        const userId = req.user._id
        const {name,description,price,features:_features} = req.body;
        const features = JSON.parse(_features);
        if (
            !name ||
            !description ||
            !price ||
            !features.length
          ) {
            return res.status(400).json({
              success: false,
              message: "All Fields are Mandatory",
            })
          }
          const mentorDetails = await User.findById(userId,
            {
                accountType:"Mentor",
            }
          )
          if(!mentorDetails){
            return res.status(400).json({
                success: false,
                message: "Instructor Details Not Found",
            })
          }
          const newPremium = await Premium.create({
            name,
            description,
            owner: mentorDetails._id,
            price,
            features,
          })
          return  res.status(200).json({
            success: true,
            data: newPremium,
            message: "Course Created Successfully",
          })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        })
    }   
}

const showAllPremium = async(req,res)=>{
    try {
        const allPremiums = await Premium.find({},{
            name:true,
            price:true,
            owner:true
        }).populate("owner").exec();
        return res.status(201).json({
            success:true,
            message:"Successfully fetched course Data",
            data:allPremiums
        })
    } catch (error) {
        return res.status(502).json({
            success:false,
            message:"Cannot fetch course Data",
            error:error.message
        })
    }
}

const getPremiumDetails = async(req,res)=>{
    try {
        const {premiumId} = req.params;
        const premiumDetails = await Premium.findOne(
            {_id:premiumId},
        ).populate("owner")
        .exec();
        if(!premiumDetails){
            return res.status(401).json({
                success:false,
                message:`could not find the course with this ${premiumId}`
            })
        }
        return res.status(200).json({
            success:true,
            message:`course fetched successfully`,
            data: {
              premiumDetails,
            },
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getOwnerPremiums = async (req, res) => {
    try {
      const instructorId = req.user._id
      const instructorCourses = await Premium.find({
        owner: instructorId,
      }).sort({ createdAt: -1 })
  
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

  const checkPurchaseStatus = async (req, res) => {
    const { sectionId } = req.params;
    const userId = req.user._id; // Assuming you're using JWT authentication and user info is available in req.user
    console.log(sectionId)
    try {
        // Find the premium section
        const premiumSection = await Premium.findById(sectionId);
        if (!premiumSection) {
            return res.status(404).json({ success: false, message: 'Premium section not found' });
        }
        const owner = premiumSection.owner;

        // Find the user and check if they have purchased
        const user = await User.findById(owner);
        const user2 = await User.findById(userId);
        const hasPurchased = user.mentees.includes(userId)
      //   && user2.paymentDates.some(pd =>
      //     pd.premiumId.toString() === sectionId && pd.date > new Date()
      // );

        return res.json({ success: true, data: hasPurchased });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};


module.exports = {createPremium,showAllPremium,getPremiumDetails,getOwnerPremiums,checkPurchaseStatus}