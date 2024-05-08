import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBook1715158248361 implements MigrationInterface {
    name = 'AddBook1715158248361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "borrow_count"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "borrow_count" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "borrow_count"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "borrow_count" character varying(1000000)`);
    }

}
