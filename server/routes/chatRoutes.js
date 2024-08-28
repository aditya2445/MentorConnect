const express = require("express");
const {accessChat} = require("../controllers/chatController");
const {authMiddleware} = require("../middlewares/auth")

const router = express.Router();
router.route("/").post(authMiddleware,accessChat);

module.exports = router;