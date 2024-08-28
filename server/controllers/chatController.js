const path = require("path");
const Chat = require("../models/chatModel")
const User = require("../models/User")

const accessChat = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.status(400).json({ message: "UserId param is required" });
    }
  
    try {
      // Find if there's an existing one-on-one chat between the two users
      let isChat = await Chat.find({
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password")
        .populate({
            path:"latestMessage",
            populate:{
              path:"sender",
              select:"firstname email"
            }
        });
  
      // Populate the sender field in the latest message
      // console.log("isChat",isChat);
      if (isChat.length > 0) {
        res.json(isChat[0]); // Ensure only the relevant chat is returned
      } else {
        // Create a new chat if no existing chat is found
        const chatData = {
          chatName: "sender",
          users: [req.user._id, userId], // Include both users here
        };
  
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id })
          .populate("users", "-password")
          .populate({
            path: "latestMessage",
            populate: {
              path: "sender",
              select: "firstName image email",
            },
          });
  
        return res.status(200).json({
          success: true,
          message: "Accessed all the chats",
          data: fullChat,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

const fetchChats = async (req, res) => {
    try {
        let results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate({
              path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "firstName image email",
                }
            })
        .sort({ updatedAt: -1 });

        console.log("results here is",results);
        return res.status(200).json({
            success:true,
            message:"Fetched successfully",
            data:results
        })
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({
            message: "Server Error", 
            error: error.message 
        });
    }
};

module.exports = {accessChat,fetchChats}