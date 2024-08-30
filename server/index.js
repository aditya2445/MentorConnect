const express  = require("express")
const app = express()
const cors =require('cors')
const cookieParser = require("cookie-parser")
const { dbConnect } = require("./config/database")
const {cloudinaryConnect} = require("./config/cloudinary")
const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/profileRoutes')
const mentorRoutes = require('./routes/mentoRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const ratingReview = require('./routes/ratingReview')
const fileUpload = require("express-fileupload")
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
require('./controllers/google')
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '35mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '35mb',
  parameterLimit: 50000, 
}));
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "cyberwolve",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/v1/mentor",mentorRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/rating", ratingReview);

app.listen(process.env.PORT,()=>{
    console.log("server is online")
})
