import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImageTableWithNewColumns1783956958503 implements MigrationInterface {
    name = 'UpdateImageTableWithNewColumns1783956958503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ADD "contentType" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD "size" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "contentType"`);
    }

}
