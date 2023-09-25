import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1695661178404 implements MigrationInterface {
  name = "CreateUserTable1695661178404";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_at" TIMESTAMP NOT NULL, "comment" text, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
