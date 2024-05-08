import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLog1715166327588 implements MigrationInterface {
    name = 'AddLog1715166327588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" ADD "status" character varying NOT NULL DEFAULT 'Đang mượn'`);
        await queryRunner.query(`ALTER TABLE "borrow" ADD "history" character varying NOT NULL DEFAULT 'Đang mượn'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" DROP COLUMN "history"`);
        await queryRunner.query(`ALTER TABLE "borrow" DROP COLUMN "status"`);
    }

}
