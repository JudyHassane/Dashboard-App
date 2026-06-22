import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookEntity1778224578626 implements MigrationInterface {
  name = "AddBookEntity1778224578626";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."book_status_enum" AS ENUM('available', 'out of stock')`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "isbn" character varying NOT NULL, "description" text, "category" character varying NOT NULL, "cover_image" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', "status" "public"."book_status_enum" NOT NULL DEFAULT 'out of stock', "date_added" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TYPE "public"."book_status_enum"`);
  }
}
