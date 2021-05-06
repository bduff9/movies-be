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
export class CreateMovieTable1613441920649 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists movies
        (
            MOVIEID int unsigned auto_increment
                primary key,
            ITEMID int unsigned null,
            MOVIETITLE varchar(99) null,
            MOVIEURL varchar(99) null,
            constraint fk_MOVIEITEMID
                foreign key (ITEMID) references movitems (ITEMID)
                    on update cascade on delete cascade,
            index idx_ITEMID (ITEMID),
            index idx_MOVIETITLE (MOVIETITLE),
            index idx_MOVIEURL (MOVIEURL)
        )
        charset=utf8mb4`);
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`drop table movies`);
	}
}
