import { MigrationInterface, QueryRunner } from "typeorm";

export class NewData1715100317397 implements MigrationInterface {
    name = 'NewData1715100317397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(1000000), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "author_book"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "author_id" character varying(1000000)`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "published_year" character varying(1000000)`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "category_id" character varying(1000000)`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "borrow_count" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "created_at_book" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "updated_at_book" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "updated_at_book"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "created_at_book"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "borrow_count"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "published_year"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "author_book" character varying(1000000)`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
