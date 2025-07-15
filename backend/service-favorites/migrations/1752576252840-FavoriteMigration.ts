import { MigrationInterface, QueryRunner } from "typeorm";

export class FavoriteMigration1752576252840 implements MigrationInterface {
    name = 'FavoriteMigration1752576252840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."favorites_status_enum" AS ENUM('uploaded', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer NOT NULL, "propertyId" integer NOT NULL, "status" "public"."favorites_status_enum" NOT NULL DEFAULT 'uploaded', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TYPE "public"."favorites_status_enum"`);
    }

}
