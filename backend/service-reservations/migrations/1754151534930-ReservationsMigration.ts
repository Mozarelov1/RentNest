import { MigrationInterface, QueryRunner } from "typeorm";

export class ReservationsMigration1754151534930 implements MigrationInterface {
    name = 'ReservationsMigration1754151534930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "PK_fe3f5698a79899dd0a59f6ff4f5"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "PK_da95cef71b617ac35dc5bcda243"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "PK_fe3f5698a79899dd0a59f6ff4f5" PRIMARY KEY ("id", "propertyID")`);
    }

}
