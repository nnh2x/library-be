import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipBookCategoryPart31715156555516 implements MigrationInterface {
    name = 'AddRelationshipBookCategoryPart31715156555516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD CONSTRAINT "FK_6f876b6edc0fd8fb1dbd825cce4" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP CONSTRAINT "FK_6f876b6edc0fd8fb1dbd825cce4"`);
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "category_id"`);
    }

}
