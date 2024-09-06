const express = require('express');
const router = express.Router();
const{
    bookSession,
    getAllSessions,
    getSessionById,
    updateSessionStatus,
    addFeedback,
    deleteSession,
    sessionTimeUpdate,
} = require("../controllers/sessionController")
const {authMiddleware,isMentor, isMentee} = require("../middlewares/auth");
const { createTimeSlot, getTimeSlot, getSessionRequests, acceptReq, rejectReq } = require('../controllers/timeSlot');

router.post('/book-session',authMiddleware,isMentee,bookSession);
router.get('/all',authMiddleware,getAllSessions);
router.get('/:sessionId',authMiddleware,getSessionById);
router.patch('/:sessionId',authMiddleware,isMentor,updateSessionStatus);
router.patch('/:sessionId/feedback',authMiddleware,addFeedback);
router.delete('/:sessionId', authMiddleware,deleteSession);
router.post("/createTimeSlots",authMiddleware,isMentor,createTimeSlot)
router.post("/getTimeSlots",getTimeSlot)
router.post("/time",sessionTimeUpdate)
router.post("/requests",authMiddleware,isMentor,getSessionRequests)
router.post("/accept",authMiddleware,isMentor,acceptReq)
router.post("/reject",authMiddleware,isMentor,rejectReq)


module.exports = router;
