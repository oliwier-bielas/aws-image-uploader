import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImagesTable1783875082704 implements MigrationInterface {
    name = 'CreateImagesTable1783875082704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying(500) NOT NULL, "originalName" character varying(255) NOT NULL, CONSTRAINT "UQ_b81c3bf4a0c17cf677d1d9e2abe" UNIQUE ("key"), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
