import { MigrationInterface, QueryRunner } from "typeorm";

export class PullData1715136705993 implements MigrationInterface {
    name = 'PullData1715136705993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book-in-library" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_of_book" character varying(1000000), "author_id" character varying(1000000), "published_year" character varying(1000000), "category_id" character varying(1000000), "borrow_count" character varying(1000000), "created_at_book" TIMESTAMP NOT NULL DEFAULT now(), "updated_at_book" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b0febe2e4500c504514dbe6a58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(1000000), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book-in-library"`);
    }

}
