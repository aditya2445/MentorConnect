const express = require("express");
const { createPost,deletePost,updatePost,getPosts,myPosts } = require("../controllers/postController");
const { authMiddleware, isMentor } = require("../middlewares/auth");
const route = express.Router();

route.post("/create",authMiddleware,isMentor,createPost);
route.get("/",authMiddleware,getPosts);
route.put("/update/:postId",authMiddleware,isMentor,updatePost);
route.delete("/delete/:postId",authMiddleware,isMentor,deletePost);
route.get("/myposts",authMiddleware,isMentor,myPosts);

module.exports = route