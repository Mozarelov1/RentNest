import { MigrationInterface, QueryRunner } from "typeorm";

export class NotifMigration1752742374615 implements MigrationInterface {
    name = 'NotifMigration1752742374615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_templates" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "subject" character varying(200) NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_06c564c515d8cdb40b6f3bfbbb4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_templates"`);
    }

}
