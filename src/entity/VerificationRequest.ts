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
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('verification_requests', { schema: 'media_tracker' })
@ObjectType()
export class VerificationRequest extends BaseEntity {
	@Field(() => Int, { nullable: false })
	@PrimaryGeneratedColumn({
		type: 'integer',
		name: 'id',
		unsigned: false,
	})
	public id!: number;

	@Field(() => String, { nullable: false })
	@Column({
		length: 255,
		name: 'identifier',
		nullable: false,
		type: 'varchar',
	})
	public identifier!: string;

	@Field(() => String, { nullable: false })
	@Column({
		length: 255,
		name: 'token',
		nullable: false,
		type: 'varchar',
	})
	public token!: string;

	@Field(() => Date, { nullable: false })
	@Column({
		name: 'expires',
		nullable: false,
		type: 'timestamp',
	})
	public expires!: Date;

	@Field(() => Date, { nullable: false })
	@CreateDateColumn({
		default: () => 'CURRENT_TIMESTAMP',
		name: 'created_at',
		nullable: false,
		precision: null,
		type: 'timestamp',
		update: false,
	})
	public createdAt!: Date;

	@Field(() => Date, { nullable: false })
	@UpdateDateColumn({
		default: () => 'CURRENT_TIMESTAMP',
		name: 'updated_at',
		nullable: false,
		onUpdate: 'CURRENT_TIMESTAMP',
		precision: null,
		type: 'timestamp',
	})
	public updatedAt!: Date;
}
