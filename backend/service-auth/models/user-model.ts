import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    email: {
      type: 'varchar',
      unique: true,
      nullable: false,
    },
    passwordHash: {
      type: 'varchar',
      nullable: true,      
    },
    googleID: {
      type: 'varchar',
      unique: true,
      nullable: true,      
    },
    name: {
      type: 'varchar',
      nullable: true,
    },
    photo: {
      type: 'varchar',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
    }
})