const Session = require("../models/sessionModel");
const User = require("../models/User");
const mongoose = require("mongoose");
const bookSession = async(req,res)=>{
    try {
        const {mentorId,topic,date} = req.body;
        const mentor = await User.findById(mentorId,{accountType:"Mentor"});
        // console.log(mentor);
        const menteeId = req.user._id;
        // console.log(req.user._id);
        if(!mentor || !menteeId){
            return res.status(400).json({
                success:false,
                message:"mentor or menteeId is invalid"
            })
        }

        const newSession = await Session.create({
            mentor:mentorId,
            mentee:new mongoose.Types.ObjectId(String(menteeId)),
            topic,
            date:new Date(date),
            feedback:" "
        });
        res.status(201).json({
            success:true,
            message: "Session booked successfully", 
            data: newSession 
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "An error occurred while booking the session",
            error: error.message 
        });
    }
}

const getAllSessions = async(req,res)=>{
    try {
        const sessions = await Session.find({},{mentor:req.user._id}).populate(
            {
                path:"mentee",
                select:"firstName email"
            }
        );
        if(!sessions || sessions.length === 0){
            return res.status(400).json({
                success:false,
                message:"sessions cant be fetched",
            })
        }
        return res.status(200).json({
            success:true,
            message:"all sessions fetched",
            data:sessions,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })        
    }
}

const getSessionById = async(req,res)=>{
    try {
        const {sessionId} = req.params;
        const session = await Session.findById(sessionId).populate("mentor mentee");
        if(!session){
            return res.status(404).json({
                successLfalse,
                message: "Session not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"session fetched successfully",
            data:session
        })
    } catch (error) {
        res.status(500).json({ 
            message: "An error occurred while retrieving the session",
            error: error.message 
        });
    }
}

const updateSessionStatus = async(req,res)=>{
    try {
        const {sessionId} = req.params;
        const session = await Session.findByIdAndUpdate(sessionId,{status:"Completed"},{new:true});
        if(!session){
            return res.status(404).json({ 
                success:false,
                message: "Session not found" 
            });
        }
        res.status(200).json({ 
            success:true,
            message: "Session status updated", 
            data:session 
        });
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message: "An error occurred while updating the session status", 
            error: error.message 
        });
    }
}

const addFeedback = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { feedback } = req.body;

        const session = await Session.findByIdAndUpdate(sessionId, { feedback }, { new: true });
        if (!session) {
            return res.status(404).json({ 
                success:false,
                message: "Session not found" 
            });
        }
        res.status(200).json({ 
            success:true,
            message: "Feedback added to session", 
            data:session 
        });
    } catch (error) {
        res.status(500).json({ 
            success:true,
            message: "An error occurred while adding feedback", 
            error: error.message 
        });
    }
};

const deleteSession = async(req,res)=>{
    try {
        const {sessionId} = req.body;
        const session = await Session.findByIdAndDelete(sessionId);
        if (!session) {
            return res.status(404).json({ 
                success:false,
                message: "Session not found" 
            });
        }
        return res.status(200).json({ 
            success:true,
            message: "session deleted successfully" 
        });
    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: error.message 
        });
    }
}

module.exports = {bookSession,getSessionById,updateSessionStatus,addFeedback,deleteSession,getAllSessions}