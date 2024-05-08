import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationshipBookBorrow1715137369197
  implements MigrationInterface
{
  name = 'AddRelationshipBookBorrow1715137369197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "borrow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(1000000), "borrow_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" TIMESTAMP NOT NULL DEFAULT now(), "book_id" uuid, CONSTRAINT "PK_dff0c680b9c6fc99f5a20d67a97" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrow" ADD CONSTRAINT "FK_ec69a535ed9d28d1722803d04a9" FOREIGN KEY ("book_id") REFERENCES "book-in-library"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "borrow" DROP CONSTRAINT "FK_ec69a535ed9d28d1722803d04a9"`,
    );
    await queryRunner.query(`DROP TABLE "borrow"`);
  }
}
