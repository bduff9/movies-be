import { MigrationInterface, QueryRunner } from 'typeorm';

// ts-prune-ignore-next
export class CreateSessionsTable1613862594414 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE sessions
        (
          id            INT NOT NULL AUTO_INCREMENT,
          user_id       INTEGER NOT NULL,
          expires       TIMESTAMP(6) NOT NULL,
          session_token VARCHAR(255) NOT NULL,
          access_token  VARCHAR(255) NOT NULL,
          created_at    TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at    TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          constraint uk_session_token
            unique (session_token(250)),
          constraint uk_access_token
            unique (access_token(250))
        )
        charset=utf8mb4`);
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`drop table sessions`);
	}
}
