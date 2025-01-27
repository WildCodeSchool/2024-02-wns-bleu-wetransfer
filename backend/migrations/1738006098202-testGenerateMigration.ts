import { MigrationInterface, QueryRunner } from "typeorm";

export class TestGenerateMigration1738006098202 implements MigrationInterface {
    name = 'TestGenerateMigration1738006098202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "billing" ADD "test" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "billing" DROP COLUMN "test"`);
    }

}
