import { MigrationInterface, QueryRunner } from "typeorm";

export class EnableOtp1691403717447 implements MigrationInterface {
    name = 'EnableOtp1691403717447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otp_enable"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "otp_enable" boolean NOT NULL DEFAULT false`);
    }

}
