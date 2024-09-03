const Session = require("../models/sessionModel");
const TimeSlots = require("../models/TimeSlots");
const User = require("../models/User");
const mongoose = require("mongoose");
const bookSession = async(req,res)=>{
    try {
        const {mentorId,title,description,startDate,endDate,status="Pending"} = req.body;
        const mentor = await User.findById(mentorId,{accountType:"Mentor"});
        const menteeId = req.user._id;
        if(!mentor || !menteeId){
            return res.status(400).json({
                success:false,
                message:"mentor or menteeId is invalid"
            })
        }
        const isSession = await Session.findOne({$and:[{mentee:menteeId},{startDate:new Date(startDate)},{endDate:new Date(endDate)},{status:"Scheduled"}]})
        if(isSession){
            return res.status(400).json({
                success:false,
                message:"Slot is Already booked"
            })
        }
        
        const isSlotAvailable = await TimeSlots.findOne({$and:[{mentor:mentorId},{start:new Date(startDate)},{end:new Date(endDate)}]})
        
        if(isSlotAvailable){
            await TimeSlots.deleteOne({_id:isSlotAvailable._id})
            await User.findByIdAndUpdate(mentorId,{$pull:{timeSlots:isSlotAvailable._id}},{new:true})
            const session = await Session.create({
                title:title,
                description:description,
                mentor:mentorId,
                mentee:menteeId,
                startDate:new Date(startDate),
                endDate:new Date(endDate),
                status:"Scheduled"
            })
            await User.findByIdAndUpdate(mentorId,{$push:{events:session._id}},{new:true})
            await User.findByIdAndUpdate(menteeId,{$push:{events:session._id}},{new:true})
            return res.status(201).json({
                success:true,
                message: "Session booked successfully",  
            });
        }
        const session = await Session.create({
            title:title,
            description:description,
            mentorId:mentorId,
            menteeId:menteeId,
            startDate:new Date(startDate),
            endDate:new Date(endDate),
            status:"Pending"
        })
        
        res.status(201).json({
            success:true,
            message: "Session requst sent", 
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
        const userId = req.user._id;
        const sessions = await User.findById(userId).populate("events");
        
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

