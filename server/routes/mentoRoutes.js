const express = require("express");
const { createMentorApp, checkMentorApp } = require("../controllers/mentorApp");
const { authMiddleware } = require("../middlewares/auth");
const { fetchMentors } = require("../controllers/mentor");
const route = express.Router();

route.post("/mentorApp",authMiddleware,createMentorApp);
route.get("/checkMentor",authMiddleware,checkMentorApp);
route.get("/fetchMentors",authMiddleware,fetchMentors)

module.exports = route