const express = require("express");
const { sendOtp, signUp, logIn } = require("../controllers/auth");
const route = express.Router();

route.post("/sendotp",sendOtp)
route.post("/signup",signUp)
route.post("/login",logIn)

module.exports = route