import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipBookCategoryPart21715156367178 implements MigrationInterface {
    name = 'AddRelationshipBookCategoryPart21715156367178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" DROP COLUMN "category_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-in-library" ADD "category_id" character varying(1000000)`);
    }

}
