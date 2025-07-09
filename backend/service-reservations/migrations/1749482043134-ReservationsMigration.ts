import { MigrationInterface, QueryRunner } from "typeorm";

export class ReservationsMigration1749482043134 implements MigrationInterface {
    name = 'ReservationsMigration1749482043134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "propertyID" integer NOT NULL, "guests" integer NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, CONSTRAINT "PK_fe3f5698a79899dd0a59f6ff4f5" PRIMARY KEY ("id", "propertyID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
