import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CreateConversationDto } from '../dto/CreateConversationDto';

const chatService = require("../services/chat-service")

class ChatController {
  async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string };
      const userId = Number(payload.sub);

      const dto: CreateConversationDto = {
        participants: [userId, ...(req.body.participants || [])]
      };
      const conversation = await chatService.createConversation(dto);
      res.status(201).json(conversation);
    } catch (e) {
      console.error('Error creating conversation:', e);
      next(e);
    }
  }

  async listConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string };
      const userId = Number(payload.sub);

      const conversations = await chatService.listConversations(userId);
      res.json(conversations);
    } catch (e) {
      console.error('Error fetching conversations:', e);
      next(e);
    }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string };
      const userId = Number(payload.sub);
      const conversationId = Number(req.params.conversationId);

      const messages = await chatService.getHistory(userId, conversationId);
      res.json(messages);
    } catch (e) {
      console.error('Error fetching history:', e);
      next(e);
    }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string };
      const userId = Number(payload.sub);
      const conversationId = Number(req.params.conversationId);
      const { text } = req.body;

      const message = await chatService.sendMessage(userId, conversationId, text);
      res.status(201).json(message);
    } catch (e) {
      console.error('Error sending message:', e);
      next(e);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string };
      const userId = Number(payload.sub);
      const conversationId = Number(req.params.conversationId);
      const { messageIds } = req.body;

      const result = await chatService.markAsRead(userId, conversationId, messageIds);
      res.json(result);
    } catch (e) {
      console.error('Error marking as read:', e);
      next(e);
    }
  }
}

module.exports = new ChatController();