const express = require("express");
const { createMentorApp, checkMentorApp, getAllMentorsApp, AcceptMentor, RejectMentor } = require("../controllers/mentorApp");
const { authMiddleware, isAdmin } = require("../middlewares/auth");
const { fetchMentors, topMentors } = require("../controllers/mentor");
const route = express.Router();

route.post("/mentorApp",authMiddleware,createMentorApp);
route.get("/checkMentor",authMiddleware,checkMentorApp);
route.get("/fetchMentors",authMiddleware,fetchMentors);
route.get("/getAllMentorsApp",authMiddleware,isAdmin,getAllMentorsApp);
route.post("/AcceptMentor",authMiddleware,isAdmin,AcceptMentor);
route.post("/RejectMentor",authMiddleware,isAdmin,RejectMentor);
route.get("/topMentors",topMentors);

module.exports = route