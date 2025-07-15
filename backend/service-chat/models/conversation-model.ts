import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: "Conversation",
  tableName: "conversations",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    participants: {
      type: "int",
      array: true,
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});