import { ChatDataSource } from '../config/data-source';
import { producer } from '../config/kafka';
import { CreateConversationDto } from '../dto/CreateConversationDto';
import { SelectQueryBuilder } from 'typeorm';

const Conversation = require("../models/conversation-model");
const Message = require("../models/message-model")

class ChatService {
  private convRepo = ChatDataSource.getRepository<typeof Conversation>(Conversation);
  private msgRepo = ChatDataSource.getRepository<typeof Message>(Message);

  
  async createConversation(dto: CreateConversationDto) {
    const [userId, withUserId] = dto.participants;
    let conv = await this.convRepo
      .createQueryBuilder('c')
      .where(':u = ANY(c.participants)', { u: userId })
      .andWhere(':w = ANY(c.participants)', { w: withUserId })
      .andWhere('array_length(c.participants, 1) = 2')
      .getOne();

    if (!conv) {
      conv = this.convRepo.create({ participants: dto.participants });
      await this.convRepo.save(conv);
    }
    return conv;
  }


  async listConversations(userId: number) {
    return this.convRepo
      .createQueryBuilder('c')
      .where(':u = ANY(c.participants)', { u: userId })
      .getMany();
  }


  async getHistory(userId: number, conversationId: number) {
    const conv = await this.convRepo.findOneBy({ id: conversationId });
    if (!conv || !conv.participants.includes(userId)) {
      throw new Error('Access denied');
    }
    return this.msgRepo.find({
      where: { conversationId },
      order: { ts: 'ASC' },
    });
  }


  async sendMessage(userId: number, conversationId: number, text: string) {
    const conv = await this.convRepo.findOneBy({ id: conversationId });
    if (!conv || !conv.participants.includes(userId)) {
      throw new Error('Access denied');
    }
    const ts = Date.now();
    const msg = this.msgRepo.create({ conversationId, senderId: userId, text, ts });
    const saved = await this.msgRepo.save(msg);

    await producer.send({
      topic: 'chat-messages',
      messages: [{ key: String(conversationId), value: JSON.stringify(saved) }],
    });

    return saved;
  }

  async markAsRead(userId: number, conversationId: number, messageIds: number[]) {
    const msgs = await this.msgRepo.findByIds(messageIds);
    const toUpdate = msgs.filter(
      m => m.conversationId === conversationId && !m.readBy.includes(userId)
    );
    for (const m of toUpdate) {
      m.readBy.push(userId);
      await this.msgRepo.save(m);
    }
    return { success: true };
  }
}

module.exports = new ChatService();