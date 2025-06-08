import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyMigration1749151588935 implements MigrationInterface {
    name = 'PropertyMigration1749151588935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "properties" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text, "city" character varying(100) NOT NULL, "region" character varying(100), "street" character varying(255), "latitude" double precision, "longitude" double precision, "pricePerNight" integer NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "bedrooms" integer NOT NULL DEFAULT '1', "bathrooms" integer NOT NULL DEFAULT '1', "area" integer, "amenities" text, "availableFrom" TIMESTAMP, "availableTo" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, "photos" text, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_47b8bfd9c3165b8a53cd0c58df0" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_47b8bfd9c3165b8a53cd0c58df0"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "properties"`);
    }

}
