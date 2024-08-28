const Message = require("../models/messageModel");
const User = require("../models/User");
const Chat = require("../models/chatModel");
const path = require("path");

const allMessages = async(req,res)=>{
    try {
        const message = await Message.find({
            chat:req.params.chatId
        }).populate("sender","name pic email")
        .populate("chat");
        return res.status(200).json({
            success:true,
            message:"allMessages fetched",
            data:message
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    try {
        // Log the request user ID and incoming message data
        console.log("User ID:", req.user._id);
        console.log("Incoming Message Data:", { content, chatId });

        // Create a new message
        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };

        // Log the newMessage object for debugging
        console.log("New Message Object:", newMessage);

        // Create the message
        let message = await Message.create(newMessage);

        // Log the created message
        console.log("Created Message:", message);

        // Retrieve the full message document and populate necessary fields
        message = await Message.findById(message._id)
            .populate("sender", "firstName image")
            .populate({
                path: "chat",
                populate: {
                    path: "users",
                    select: "firstName email"
                }
            });

        // Log the message after population
        console.log("Message after population:", message);

        // Update the latest message in the chat
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: message
        });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};



module.exports = {allMessages,sendMessage}