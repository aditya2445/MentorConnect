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
      .populate("latestMessage");

      // Populate the sender field in the latest message
      isChat = await User.populate(isChat, {
          path: "latestMessage.sender",
          select: "firstname image email",
      });

      if (isChat.length > 0) {
          res.json(isChat);
      } else {
          // Create a new chat if no existing chat is found
          const chatData = {
              chatName: "sender",
              isGroupChat: false,
              users: [req.user._id, userId],
          };

          const createdChat = await Chat.create(chatData);
          const fullChat = await Chat.findOne({ _id: createdChat._id })
              .populate("users", "-password");

          return res.status(200).json({
              success: true,
              message: "Accessed all the chats",
              data: fullChat
          });
      }
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};


module.exports = {accessChat}