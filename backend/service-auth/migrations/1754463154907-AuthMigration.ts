import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthMigration1754463154907 implements MigrationInterface {
    name = 'AuthMigration1754463154907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "sub" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "sub"`);
    }

}
