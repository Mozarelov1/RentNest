import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthMigration1753271307444 implements MigrationInterface {
    name = 'AuthMigration1753271307444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "ip_address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "ip_address" SET NOT NULL`);
    }

}
