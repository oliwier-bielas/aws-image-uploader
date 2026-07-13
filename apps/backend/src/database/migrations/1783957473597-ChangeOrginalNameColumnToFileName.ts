import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOrginalNameColumnToFileName1783957473597 implements MigrationInterface {
    name = 'ChangeOrginalNameColumnToFileName1783957473597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" RENAME COLUMN "originalName" TO "fileName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" RENAME COLUMN "fileName" TO "originalName"`);
    }

}
