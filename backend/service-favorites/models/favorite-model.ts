import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: "Favorites",
  tableName: "favorites",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    userId: {
      type: "int",
      nullable: false,
    },
    propertyId: {
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
    }
  },
});
