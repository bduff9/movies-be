import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVerificationRequestsTable1613862949548
	implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE verification_requests
        (
          id         INT NOT NULL AUTO_INCREMENT,
          identifier VARCHAR(255) NOT NULL,
          token      VARCHAR(255) NOT NULL,
          expires    TIMESTAMP(6) NOT NULL,
          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          constraint uk_token
            unique (token(250))
        )
        charset=utf8mb4`);
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`drop table verification_requests`);
	}
}
