const express = require("express")
const { authMiddleware, isAdmin } = require("../middlewares/auth")
const { createCategory, showAllCategory } = require("../controllers/category")
const route = express.Router()

route.post("/createCategory",authMiddleware,isAdmin,createCategory);
route.get("/showAllCategory",showAllCategory)

module.exports = route