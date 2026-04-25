import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastName1777029119912 implements MigrationInterface {
    name = 'AddLastName1777029119912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    }

}
