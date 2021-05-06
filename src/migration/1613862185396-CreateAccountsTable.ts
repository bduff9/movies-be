/*******************************************************************************
 * Movies BE - the backend implementation of a movie tracker.
 * Copyright (C) 2015-present Brian Duffey and Billy Alexander
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 * Home: https://asitewithnoname.com/
 */
import { MigrationInterface, QueryRunner } from 'typeorm';

// ts-prune-ignore-next
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
