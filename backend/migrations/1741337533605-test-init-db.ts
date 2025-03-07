import { MigrationInterface, QueryRunner } from "typeorm";

export class TestInitDb1741337533605 implements MigrationInterface {
    name = 'TestInitDb1741337533605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plan" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "billing" character varying NOT NULL, "description" character varying NOT NULL, "is_suggested" boolean DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "billing" ("id" SERIAL NOT NULL, "subscription_date" TIMESTAMP NOT NULL DEFAULT now(), "end_subscription_date" TIMESTAMP, "last_payment_date" TIMESTAMP NOT NULL, "next_payment_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "plan_id" integer, "user_id" integer, CONSTRAINT "REL_6ec7451dce8b34da53e553f81d" UNIQUE ("user_id"), CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fileId" integer, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "file_uid" character varying, "name" character varying, "default_name" character varying, "path" character varying, "size" integer, "privacy_status" character varying DEFAULT 'public', "type" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploadId" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visitor" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "email_is_verified" boolean NOT NULL DEFAULT false, "code" integer NOT NULL DEFAULT '123456', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba6ae421d03de90a99ed838741d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "message" text, "is_activated" boolean NOT NULL DEFAULT true, "receivers" text array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "visitorId" integer, "userId" integer, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile_picture_name" character varying, "role" character varying NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_access_file" ("file_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_316aec9a0fa9a8f556a4cde7cba" PRIMARY KEY ("file_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_12d4f940ca53050751b11229a5" ON "user_access_file" ("file_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e765bdc2b73b32ff3aa0335518" ON "user_access_file" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "FK_63f4db8ca9063690ab4dfc3b3da" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing" ADD CONSTRAINT "FK_6ec7451dce8b34da53e553f81dc" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_745a0f7c76266d259bcc4ec74e3" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_0583ebc4d98a0010a9475fb7ee0" FOREIGN KEY ("uploadId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_8152634c574ca03d2490c87013e" FOREIGN KEY ("visitorId") REFERENCES "visitor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_0acad24db01762fb1d5b51a70cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_access_file" ADD CONSTRAINT "FK_12d4f940ca53050751b11229a5c" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_access_file" ADD CONSTRAINT "FK_e765bdc2b73b32ff3aa03355187" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_access_file" DROP CONSTRAINT "FK_e765bdc2b73b32ff3aa03355187"`);
        await queryRunner.query(`ALTER TABLE "user_access_file" DROP CONSTRAINT "FK_12d4f940ca53050751b11229a5c"`);
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_0acad24db01762fb1d5b51a70cd"`);
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_8152634c574ca03d2490c87013e"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_0583ebc4d98a0010a9475fb7ee0"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_745a0f7c76266d259bcc4ec74e3"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "FK_6ec7451dce8b34da53e553f81dc"`);
        await queryRunner.query(`ALTER TABLE "billing" DROP CONSTRAINT "FK_63f4db8ca9063690ab4dfc3b3da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e765bdc2b73b32ff3aa0335518"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12d4f940ca53050751b11229a5"`);
        await queryRunner.query(`DROP TABLE "user_access_file"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TABLE "visitor"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "billing"`);
        await queryRunner.query(`DROP TABLE "plan"`);
    }

}
