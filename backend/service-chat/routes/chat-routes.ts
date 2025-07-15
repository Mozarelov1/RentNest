import express from "express";
const router = express.Router();

const chatController = require("../controllers/chatController")

router.post('/conversations',chatController.createConversation);
router.post('/conversations/:conversationId/send',chatController.sendMessage);
router.post('/conversations/:conversationId/read',chatController.markAsRead);
router.get('/conversations',chatController.listConversations);
router.get('/conversations/:conversationId',chatController.getHistory);

module.exports = router
