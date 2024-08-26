const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.route("/:chatId").get(authMiddleware, allMessages);
router.route("/").post(authMiddleware, sendMessage);

module.exports = router;