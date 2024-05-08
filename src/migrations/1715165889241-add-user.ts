import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1715165889241 implements MigrationInterface {
    name = 'AddUser1715165889241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrow" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "borrow" ADD CONSTRAINT "FK_45ae553821af1e987ec3f1dcee0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" DROP CONSTRAINT "FK_45ae553821af1e987ec3f1dcee0"`);
        await queryRunner.query(`ALTER TABLE "borrow" DROP COLUMN "user_id"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
