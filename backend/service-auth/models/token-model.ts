import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: "RefreshToken",
  tableName: "refresh_tokens",
  columns: {
    jti: {
      type: "uuid",
      primary: true,
    },
    iat: {
      type: "int",
      nullable: false,
    },
    exp: {
      type: "int",
      nullable: false,
    },
    revoked: {
      type: "boolean",
      default: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,  
    },
    revokedAt: {
      type: "timestamp",
      nullable: true,           
    },
  },
});
