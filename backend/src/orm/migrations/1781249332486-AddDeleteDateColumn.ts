import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteDateColumn1781249332486 implements MigrationInterface {
    name = 'AddDeleteDateColumn1781249332486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "deleted_at"`);
    }

}
