const express = require('express');
const router = express.Router();
const{
    bookSession,
    getAllSessions,
    getSessionById,
    updateSessionStatus,
    addFeedback,
    deleteSession,
} = require("../controllers/sessionController")
const {authMiddleware,isMentor, isMentee} = require("../middlewares/auth");
const { createTimeSlot, getTimeSlot } = require('../controllers/timeSlot');

router.post('/book-session',authMiddleware,isMentee,bookSession);
router.get('/all',authMiddleware,getAllSessions);
router.get('/:sessionId',authMiddleware,getSessionById);
router.patch('/:sessionId',authMiddleware,isMentor,updateSessionStatus);
router.patch('/:sessionId/feedback',authMiddleware,addFeedback);
router.delete('/:sessionId', authMiddleware,deleteSession);
router.post("/createTimeSlots",authMiddleware,isMentor,createTimeSlot)
router.post("/getTimeSlots",getTimeSlot)


module.exports = router;
