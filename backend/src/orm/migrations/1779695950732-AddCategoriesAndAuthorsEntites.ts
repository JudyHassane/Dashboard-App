import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoriesAndAuthorsEntites1779695950732 implements MigrationInterface {
  name = "AddCategoriesAndAuthorsEntites1779695950732";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d3962fd11a54d87f927e84d1080" UNIQUE ("name"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);

    await queryRunner.query(`ALTER TABLE "book" ADD "author_id" integer`);
    await queryRunner.query(`ALTER TABLE "book" ADD "category_id" integer`);

    await queryRunner.query(
      `INSERT INTO "author" ("name") SELECT DISTINCT "author" FROM "book"`,
    );
    await queryRunner.query(
      `INSERT INTO "category" ("name") SELECT DISTINCT "category" FROM "book"`,
    );

    await queryRunner.query(
      `UPDATE "book" SET "author_id" = (SELECT id FROM "author" WHERE "author".name = "book".author)`,
    );
    await queryRunner.query(
      `UPDATE "book" SET "category_id" = (SELECT id FROM "category" WHERE "category".name = "book".category)`,
    );

    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author"`);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "category"`);

    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "author_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "category_id" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_24b753b0490a992a6941451f405" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_0bfe418ce140d4720d0eede7c3e" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_0bfe418ce140d4720d0eede7c3e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_24b753b0490a992a6941451f405"`,
    );
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "category_id"`);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author_id"`);
    await queryRunner.query(
      `ALTER TABLE "book" ADD "category" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "author" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "last_name" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "author"`);
  }
}
