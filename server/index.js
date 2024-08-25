const express  = require("express")
const app = express()
const cors =require('cors')

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.listen(process.env.PORT,()=>{
    console.log("server is online")
})