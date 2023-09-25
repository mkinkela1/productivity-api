import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventCategoryTable1695672080742
  implements MigrationInterface
{
  name = "CreateEventCategoryTable1695672080742";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_at" TIMESTAMP, "comment" text, "name" character varying(255) NOT NULL, "colorHex" character varying(255) NOT NULL, "userId" uuid, CONSTRAINT "PK_697909a55bde1b28a90560f3ae2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_category" ADD CONSTRAINT "FK_cef228e17856183bc738f1a00f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_category" DROP CONSTRAINT "FK_cef228e17856183bc738f1a00f8"`,
    );
    await queryRunner.query(`DROP TABLE "event_category"`);
  }
}
