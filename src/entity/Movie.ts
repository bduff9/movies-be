import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { MovieItem } from './MovieItem';

@Index('ITEMID', ['itemID'], {})
@Index('MOVIETITLE', ['movieTitle'], {})
@Index('MOVIEURL', ['movieURL'], {})
@Entity('movies', { schema: 'media_tracker' })
@ObjectType()
export class Movie extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn({ type: 'int', name: 'MOVIEID', unsigned: true })
	public movieID!: number;

	@Field(() => Int, { nullable: true })
	@Column('int', { name: 'ITEMID', nullable: true, unsigned: true })
	public itemID!: number | null;

	@Field(() => String, { nullable: true })
	@Column('varchar', { name: 'MOVIETITLE', nullable: true, length: 99 })
	public movieTitle!: string | null;

	@Field(() => String, { nullable: true })
	@Column('varchar', { name: 'MOVIEURL', nullable: true, length: 99 })
	public movieURL!: string | null;

	@ManyToOne(
		() => MovieItem,
		movieItem => movieItem.movies,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
	)
	@JoinColumn([{ name: 'ITEMID', referencedColumnName: 'itemID' }])
	public item!: MovieItem;
}
