import { MigrationInterface, QueryRunner } from "typeorm";

export class ReservationsMigration1751979305396 implements MigrationInterface {
    name = 'ReservationsMigration1751979305396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reservations_status_enum" AS ENUM('confirmed', 'declined', 'cancelled', 'paid', 'checked_in', 'checked_out')`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "status" "public"."reservations_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_status_enum"`);
    }

}
