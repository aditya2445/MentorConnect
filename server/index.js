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
const postRoutes = require('./routes/postRoutes')
const premiumRoutes = require('./routes/premiumRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const fileUpload = require("express-fileupload")
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
// require("./cron-jobs/cleanEnrollments")
require('./controllers/google')
const bodyParser = require("body-parser")
const run = require("./OpenAiService")
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
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/premium", premiumRoutes);
app.use("/api/v1/payment", paymentRoutes);

const server = app.listen(process.env.PORT,()=>{
    console.log("server is online")
})

const io = require("socket.io")(server,{
    pingTimeOut:60000,
    cors:{
        origin:"http://localhost:5173",
    },
});

app.post('/api/openai', async (req, res) => {
    const { prompt } = req.body;  // Extract the prompt from the request body
  
    // Validate the prompt input
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
  
    try {
      const result = await run(prompt); // Use the chatGPTAPI method to process the text prompt
      return res.json({ result }); // Return the result in JSON format
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      return res.status(500).json({ error: 'An error occurred while processing your request' });
    }
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