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
export class CreateMovieItemTable1613441363744 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`create table if not exists movitems
        (
            ITEMID int unsigned auto_increment
                primary key,
            ORDERED int null,
            ITEMNAME varchar(99) not null,
            ITEMCASE enum('Plain', 'Box', 'Slipcover', 'Digibook', 'Steelbook') not null,
            ITEMDIGITL enum('None', 'DC', 'UV', 'DC+UV') default 'None' not null,
            ITEM3D enum('Y', 'N') default 'N' not null,
            ITEMWATCH enum('Y', 'N') default 'N' not null,
            ITEMFORMAT enum('Blu-ray', 'DVD', 'Ultra HD', 'UV', 'Digital') not null,
            ITEMSTATUS enum('Owned', 'Wanted', 'Selling', 'Waiting') not null,
            ITEMAVAIL date null,
            ITEMURL varchar(99) not null,
            ITEMNOTES text null,
            constraint idx_ORDERED
                unique (ORDERED),
            constraint uk_ORDERED
                unique (ORDERED),
            index idx_ITEM3D (ITEM3D),
            index idx_ITEMAVAIL (ITEMAVAIL),
            index idx_ITEMCASE (ITEMCASE),
            index idx_ITEMDIGITL (ITEMDIGITL),
            index idx_ITEMFORMAT (ITEMFORMAT),
            index idx_ITEMNAME (ITEMNAME),
            index idx_ITEMSTATUS (ITEMSTATUS),
            index idx_ITEMURL (ITEMURL),
            index idx_ITEMWATCH (ITEMWATCH)
        )
        charset=utf8mb4`);
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`drop table movitems`);
	}
}
