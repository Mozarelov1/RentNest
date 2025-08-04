import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: "Reviews",
  tableName: "reviews",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    rating: {
      type: "int",
      nullable: false,
    },
    comment: {
      type: "varchar",
      nullable: false,
    },
    bookingID: {
      type: "int",
      nullable: false,
    },
    propertyID: {
      type: "int",
      nullable: false,
    },
    senderID: {
      type: "int",
      nullable: false,
    },
    propertyOwnerId: {
      type: "int",
      nullable: false, 
    },
    status: {
      type: "enum",
      enum: ["uploaded", "deleted"],
      default: "uploaded",
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
