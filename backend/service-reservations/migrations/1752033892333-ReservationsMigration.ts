import { MigrationInterface, QueryRunner } from "typeorm";

export class ReservationsMigration1752033892333 implements MigrationInterface {
    name = 'ReservationsMigration1752033892333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."reservations_status_enum" RENAME TO "reservations_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."reservations_status_enum" AS ENUM('pending', 'confirmed', 'declined', 'cancelled', 'paid', 'checked_in', 'checked_out')`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "public"."reservations_status_enum" USING "status"::"text"::"public"."reservations_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reservations_status_enum_old" AS ENUM('confirmed', 'declined', 'cancelled', 'paid', 'checked_in', 'checked_out')`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "public"."reservations_status_enum_old" USING "status"::"text"::"public"."reservations_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."reservations_status_enum_old" RENAME TO "reservations_status_enum"`);
    }

}
