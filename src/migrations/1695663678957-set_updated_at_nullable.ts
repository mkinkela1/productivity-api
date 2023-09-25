import { MigrationInterface, QueryRunner } from "typeorm";

export class SetUpdatedAtNullable1695663678957 implements MigrationInterface {
  name = "SetUpdatedAtNullable1695663678957";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
  }
}
