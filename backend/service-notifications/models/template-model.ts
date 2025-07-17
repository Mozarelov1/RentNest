import { EntitySchema } from 'typeorm';

module.exports = new EntitySchema({
  name: 'EmailTemplate',
  tableName: 'email_templates',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    subject: {
      type: 'varchar',
      length: 200,
      nullable: false,
    },
    body: {
      type: 'text',
      nullable: false,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});