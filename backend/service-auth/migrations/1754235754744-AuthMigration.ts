import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthMigration1754235754744 implements MigrationInterface {
    name = 'AuthMigration1754235754744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("jti" uuid NOT NULL, "iat" integer NOT NULL, "exp" integer NOT NULL, "revoked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "revokedAt" TIMESTAMP, CONSTRAINT "PK_f3752400c98d5c0b3dca54d66d5" PRIMARY KEY ("jti"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
