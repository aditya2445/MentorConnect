const Category=require("../models/Category");

exports.createCategory=async(req,res)=>{
    try {
       
       const {name} = req.body;

       if(!name){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
       }

       const categoryDetails=await Category.create({
        name:name,
       })

       return res.status(200).json({
        success:true,
        message:"Category created successfully"
    })
        

    } catch (error) {
       return res.status(500).json({
        success:false,
        message:error.message
       }) 
    }
}

exports.showAllCategory=async(req,res)=>{
    try {

        const allCategory=await Category.find({},{name:true}).populate("mentors").exec();
        
        return res.status(200).json({
            success:true,
            message:"All Category returned successfully",
            data:allCategory
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}