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
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Account, Session } from '.';

@Entity('users', { schema: 'media_tracker' })
@ObjectType()
export class User extends BaseEntity {
	@Field(() => Int, { nullable: false })
	@PrimaryGeneratedColumn({ type: 'integer', name: 'id', unsigned: false })
	public id!: number;

	@Field(() => String, { nullable: true })
	@Column('varchar', { name: 'name', nullable: true, length: 255 })
	public name!: null | string;

	@Field(() => String, { nullable: false })
	@Column('varchar', { name: 'email', nullable: false, length: 255 })
	public email!: string;

	@Field(() => Date, { nullable: true })
	@Column('timestamp', {
		name: 'email_verified',
		nullable: true,
		default: null,
	})
	public emailVerified!: null | Date;

	@Field(() => String, { nullable: true })
	@Column('varchar', { name: 'image', nullable: true, length: 255 })
	public image!: null | string;

	@OneToMany(() => Session, session => session.userId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	sessions!: Array<Session>;

	@OneToMany(() => Account, account => account.userId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	accounts!: Array<Account>;

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
