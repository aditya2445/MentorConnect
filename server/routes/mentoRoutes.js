const express = require("express");
const { createMentorApp, checkMentorApp } = require("../controllers/mentorApp");
const { authMiddleware } = require("../middlewares/auth");
const route = express.Router();

route.post("/mentorApp",authMiddleware,createMentorApp);
route.get("/checkMentor",authMiddleware,checkMentorApp);

module.exports = route