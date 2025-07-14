import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewMigration1752477092941 implements MigrationInterface {
    name = 'ReviewMigration1752477092941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reviews_status_enum" AS ENUM('uploaded', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" character varying NOT NULL, "bookingID" integer NOT NULL, "propertyID" integer NOT NULL, "status" "public"."reviews_status_enum" NOT NULL DEFAULT 'uploaded', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TYPE "public"."reviews_status_enum"`);
    }

}
