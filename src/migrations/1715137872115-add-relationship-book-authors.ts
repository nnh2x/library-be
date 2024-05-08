import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipBookAuthors1715137872115 implements MigrationInterface {
    name = 'AddRelationshipBookAuthors1715137872115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "author_id" uuid`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD CONSTRAINT "FK_395d24d04a0128924b4507e93b4" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP CONSTRAINT "FK_395d24d04a0128924b4507e93b4"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "author_id" character varying(1000000)`);
    }

}
