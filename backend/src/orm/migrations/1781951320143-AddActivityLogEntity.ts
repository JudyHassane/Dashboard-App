import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActivityLogEntity1781951320143 implements MigrationInterface {
    name = 'AddActivityLogEntity1781951320143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."activity_log_action_enum" AS ENUM('book_created', 'book_updated', 'book_deleted', 'cover_updated', 'isbn_updated', 'title_updated', 'author_updated', 'category_updated', 'price_updated')`);
        await queryRunner.query(`CREATE TABLE "activity_log" ("id" SERIAL NOT NULL, "action" "public"."activity_log_action_enum" NOT NULL, "message" character varying NOT NULL, "entity_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_067d761e2956b77b14e534fd6f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD CONSTRAINT "FK_81615294532ca4b6c70abd1b2e6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_log" DROP CONSTRAINT "FK_81615294532ca4b6c70abd1b2e6"`);
        await queryRunner.query(`DROP TABLE "activity_log"`);
        await queryRunner.query(`DROP TYPE "public"."activity_log_action_enum"`);
    }

}
