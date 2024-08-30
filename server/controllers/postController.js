const Post = require("../models/postModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose")

const createPost = async(req,res)=>{
    try {
        const {title,content} = req.body;
        if(!title||!content){
            return res.status(400).json({
                success:false,
                message:"Some fields are missing"
            })
        }
        let imageUrl = "";
        if(req.files && req.files.pic){
            const pic = req.files.pic;
            const image = await uploadImageToCloudinary(
                pic,
                process.env.FOLDER_NAME,
                1000,
                1000,
            )
            imageUrl=image.secure_url;
        }
        const userId = req.user._id;
        const post = await Post.create({
            title,
            content,
            image:imageUrl,
            owner:userId
        })
        if(!post){
            return res.status(400).json({
                success:false,
                messsage:"cannot create post",
            })
        }
        return res.status(200).json({
            success:true,
            message:'Post Creation Successful',
            data:post
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find().populate("owner","firstName email");
        return res.status(200).json({
            success:true,
            message:"All posts fetched successfully",
            data:posts
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const updatePost = async(req,res)=>{
   try {
     const {title,content} = req.body;
     const postId = req.params.postId;
     const post = await Post.findById(postId);
     let imageUrl = post.image;
         if(req.files && req.files.pic){
             const pic = req.files.pic;
             const image = await uploadImageToCloudinary(
                 pic,
                 process.env.FOLDER_NAME,
                 1000,
                 1000,
             )
             imageUrl=image.secure_url;
         }
     const updatedPost = await Post.findByIdAndUpdate(
        postId,{title,content,imageUrl},{new:true});

     if(!updatedPost){
        return res.status(400).json({
            success:false,
            message:"Cannot update the post",
        })
     }
     return res.status(200).json({
        success:true,
        message:"post Updation successful",
        data:updatedPost
     })
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
   }
}

const deletePost = async(req,res)=>{
    try {
        const postId = req.params;
        const post = await Post.findByIdAndDelete(postId);
        return res.status(200).json({
            success:true,
            message:"post deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage:error.message
        })
    }
}

const myPosts = async(req,res)=>{
    try {
        const userId = req.user._id;
        const myPosts = await Post.find({owner:userId});
        if(!myPosts){
            return res.status(400).json({
                success:false,
                message:"cannot fetch your posts"
            })
        }
        return res.status(200).json({
            success:true,
            message:"your posts fetched successfully",
            data:myPosts
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {createPost,getPosts,updatePost,deletePost,myPosts}