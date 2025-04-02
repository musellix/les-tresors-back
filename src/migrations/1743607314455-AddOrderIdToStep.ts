import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderIdToStep implements MigrationInterface {
  name = 'AddOrderIdToStep';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "step" ADD "orderId" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "step" DROP COLUMN "orderId"`);
  }
}