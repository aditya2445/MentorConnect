const express = require('express');
const router = express.Router();
const{
    bookSession,
    getAllSessions,
    getSessionById,
    updateSessionStatus,
    addFeedback,
    deleteSession
} = require("../controllers/sessionController")
const {authMiddleware,isMentor} = require("../middlewares/auth")

router.post('/book-session',authMiddleware,bookSession);
router.get('/all',authMiddleware,isMentor,getAllSessions);
router.get('/:sessionId',authMiddleware,getSessionById);
router.patch('/:sessionId',authMiddleware,isMentor,updateSessionStatus);
router.patch('/:sessionId/feedback',authMiddleware,addFeedback);
router.delete('/:sessionId', authMiddleware,deleteSession);

module.exports = router;
