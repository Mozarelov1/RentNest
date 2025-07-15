import { MigrationInterface, QueryRunner } from "typeorm";

export class ConversationMigration1752607864425 implements MigrationInterface {
    name = 'ConversationMigration1752607864425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "conversationId" integer NOT NULL, "senderId" integer NOT NULL, "text" text NOT NULL, "ts" bigint NOT NULL, "readBy" integer array NOT NULL DEFAULT '{}', CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" SERIAL NOT NULL, "participants" integer array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
