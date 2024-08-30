const express = require("express");
const {accessChat,fetchChats} = require("../controllers/chatController");
const {authMiddleware} = require("../middlewares/auth")

const router = express.Router();
router.route("/").post(authMiddleware,accessChat);
router.route("/").get(authMiddleware,fetchChats);

module.exports = router;