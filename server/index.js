const express  = require("express")
const app = express()
const cors =require('cors')
const cookieParser = require("cookie-parser")
const { dbConnect } = require("./config/database")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

dbConnect();
//routes
const userRoutes = require('./routes/userRoutes')
app.use("/api/v1/auth",userRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is online")
})
