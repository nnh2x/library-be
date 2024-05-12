import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJ1715264876377 implements MigrationInterface {
  name = "AddJ1715264876377";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(1000000), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "borrow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(1000000), "status" character varying NOT NULL DEFAULT 'Đang mượn', "history" character varying NOT NULL DEFAULT 'Đang mượn', "borrow_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" TIMESTAMP NOT NULL DEFAULT now(), "book_id" uuid, "user_id" uuid, CONSTRAINT "PK_dff0c680b9c6fc99f5a20d67a97" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP COLUMN "borrow_count"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD "borrow_count" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP COLUMN "author_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD "author_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP COLUMN "category_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD "category_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD CONSTRAINT "FK_395d24d04a0128924b4507e93b4" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD CONSTRAINT "FK_6f876b6edc0fd8fb1dbd825cce4" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrow" ADD CONSTRAINT "FK_ec69a535ed9d28d1722803d04a9" FOREIGN KEY ("book_id") REFERENCES "book-in-library"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrow" ADD CONSTRAINT "FK_45ae553821af1e987ec3f1dcee0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "borrow" DROP CONSTRAINT "FK_45ae553821af1e987ec3f1dcee0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrow" DROP CONSTRAINT "FK_ec69a535ed9d28d1722803d04a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP CONSTRAINT "FK_6f876b6edc0fd8fb1dbd825cce4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP CONSTRAINT "FK_395d24d04a0128924b4507e93b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP COLUMN "category_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD "category_id" character varying(1000000)`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP COLUMN "author_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD "author_id" character varying(1000000)`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" DROP COLUMN "borrow_count"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book-in-library" ADD "borrow_count" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`DROP TABLE "borrow"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
