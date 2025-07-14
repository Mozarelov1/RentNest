import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: "Payment",
  tableName: "payments",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    ipspPaymentId: {
      type: "varchar",
      nullable: false,
    },
    amount: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    currency: {
      type: "varchar",
      length: 3,
      nullable: false,
    },
    status: {
      type: "enum",
      enum: ["pending", "paid", "declined", "cancelled"],
      default: "pending",
    },
    userID: {
      type: "int",
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});