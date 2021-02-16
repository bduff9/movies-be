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
