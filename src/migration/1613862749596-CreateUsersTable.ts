import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1613862749596 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE users
        (
          id             INT NOT NULL AUTO_INCREMENT,
          name           VARCHAR(255),
          email          VARCHAR(255),
          email_verified TIMESTAMP(6),
          image          VARCHAR(255),
          created_at     TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at     TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          constraint uk_email
            unique (email(250))
        )
        charset=utf8mb4`);
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`drop table users`);
	}
}
