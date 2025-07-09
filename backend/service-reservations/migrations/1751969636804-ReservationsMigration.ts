import { MigrationInterface, QueryRunner } from "typeorm";

export class ReservationsMigration1751969636804 implements MigrationInterface {
    name = 'ReservationsMigration1751969636804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "tenantID" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "tenantID"`);
    }

}
