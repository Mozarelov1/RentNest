import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: "Message",
  tableName: "messages",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    conversationId: {
      type: "int",
      nullable: false,
    },
    senderId: {
      type: "int",
      nullable: false,
    },
    text: {
      type: "text",
      nullable: false,
    },
    ts: {
      type: "bigint",
      nullable: false,
    },
    readBy: {
      type: "int",
      array: true,
      default: []
    },
  }
});
