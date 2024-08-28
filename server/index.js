const express  = require("express")
const app = express()
const cors =require('cors')
const cookieParser = require("cookie-parser")
const { dbConnect } = require("./config/database")
const {cloudinaryConnect} = require("./config/cloudinary")
const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/profileRoutes')
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
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/rating", ratingReview);

const server = app.listen(process.env.PORT,()=>{
    console.log("server is online")
})

const io = require("socket.io")(server,{
    pingTimeOut:60000,
    cors:{
        origin:"http://localhost:5173",
    },
});

io.on("connection",(socket)=>{
    console.log("Connected to Socket.io");  
    socket.on('setup',(user)=>{
        socket.join(user._id);
        socket.emit("connected");
    })
    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("User Joined Room: "+room);
    })
    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.off("setup",()=>{
        console.log("USER disconnected");
        socket.leave(userData._id);
    })
})