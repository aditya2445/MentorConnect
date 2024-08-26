const Message = require("../models/messageModel");
const User = require("../models/User");
const Chat = require("../models/chatModel");

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
    console.log(req.user._id);
    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        // Log the newMessage object to inspect chatId
        console.log("New Message Object:", newMessage);

        // Create a new message
        let message = await Message.create(newMessage);

        // Check the created message before populating
        console.log("Created Message:", message);

        // Retrieve the full message document and populate the necessary fields
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
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: message
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {allMessages,sendMessage}