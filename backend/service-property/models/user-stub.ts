import {EntitySchema} from "typeorm"

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",    
  columns: {
    id: {
      type: "int",
      primary: true,
    },

  },
  relations: {
    //@ts-ignore
    properties: {
      type: "one-to-many",
      target: "Property",
      inverseSide: "owner",
    },
  },
});
