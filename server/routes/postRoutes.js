const express = require("express");
const { createPost,deletePost,updatePost,getPosts,myPosts, getPostById } = require("../controllers/postController");
const { authMiddleware, isMentor } = require("../middlewares/auth");
const route = express.Router();

route.post("/create",authMiddleware,createPost);
route.get("/",authMiddleware,getPosts);
route.put("/update/:postId",authMiddleware,updatePost);
route.delete("/delete/:postId",authMiddleware,deletePost);
route.get("/myposts",authMiddleware,myPosts);
route.get("/posts/:id",authMiddleware,getPostById);

module.exports = route