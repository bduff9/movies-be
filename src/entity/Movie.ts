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
import { ObjectType, Field, Int } from 'type-graphql';
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
	@Field(() => Int)
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

	@ManyToOne('MovieItem', 'movies', {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'ITEMID', referencedColumnName: 'itemID' }])
	public item!: MovieItem;
}
