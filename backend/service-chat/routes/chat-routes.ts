import express from "express";
const router = express.Router();

const chatController = require("../controllers/chatController")
import { authorize } from '../../service-auth/middlewares/rbacRole-middleware'

router.post('/conversations',                        authorize(['admin', 'moderator', 'user']),  chatController.createConversation);
router.post('/conversations/:conversationId/send',   authorize(['admin', 'moderator', 'user']),  chatController.sendMessage);
router.post('/conversations/:conversationId/read',   authorize(['admin', 'moderator', 'user']),  chatController.markAsRead);
router.get('/conversations',                         authorize(['admin', 'moderator', 'user']),  chatController.listConversations);  
router.get('/conversations/:conversationId',         authorize(['admin', 'moderator', 'user']),  chatController.getHistory);

module.exports = router
