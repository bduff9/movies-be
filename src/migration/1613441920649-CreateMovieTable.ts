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
