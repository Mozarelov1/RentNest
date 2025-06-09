import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyMigration1749395075330 implements MigrationInterface {
    name = 'PropertyMigration1749395075330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "properties" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text, "city" character varying(100) NOT NULL, "region" character varying(100), "street" character varying(255), "pricePerNight" integer NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "bedrooms" integer NOT NULL DEFAULT '1', "bathrooms" integer NOT NULL DEFAULT '1', "area" integer, "amenities" text, "availableFrom" TIMESTAMP, "availableTo" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, "photos" text, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "properties"`);
    }

}
