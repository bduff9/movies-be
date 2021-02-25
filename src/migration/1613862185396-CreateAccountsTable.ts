import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountsTable1613862185396 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE accounts
        (
          id                   INT NOT NULL AUTO_INCREMENT,
          compound_id          VARCHAR(255) NOT NULL,
          user_id              INTEGER NOT NULL,
          provider_type        VARCHAR(255) NOT NULL,
          provider_id          VARCHAR(255) NOT NULL,
          provider_account_id  VARCHAR(255) NOT NULL,
          refresh_token        TEXT,
          access_token         TEXT,
          access_token_expires TIMESTAMP(6),
          created_at           TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at           TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          constraint uk_compound_id
            unique (compound_id(250)),
          index idx_provider_account_id
            (provider_account_id(250)),
          index idx_provider_id
            (provider_id(250)),
          index user_id
            (user_id)
        )
        charset=utf8mb4`);
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`drop table accounts`);
	}
}
