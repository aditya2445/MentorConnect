const express  = require("express")
const app = express()
const cors =require('cors')
const cookieParser = require("cookie-parser")
const { dbConnect } = require("./config/database")
const {cloudinaryConnect} = require("./config/cloudinary")
const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/profileRoutes')
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(
    fileUpload({
        useTempFiles:true,
        credentials:true,
    })
)
cloudinaryConnect();

dbConnect();
//routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile", profileRoutes);

app.listen(process.env.PORT,()=>{
    console.log("server is online")
})
