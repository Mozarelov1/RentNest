import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewMigration1754217838019 implements MigrationInterface {
    name = 'ReviewMigration1754217838019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ADD "propertyOwnerId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "propertyOwnerId"`);
    }

}
