import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewMigration1752505757009 implements MigrationInterface {
    name = 'ReviewMigration1752505757009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ADD "senderID" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "senderID"`);
    }

}
