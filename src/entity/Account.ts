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
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { User } from '.';

@Entity('accounts', { schema: 'media_tracker' })
@ObjectType()
export class Account extends BaseEntity {
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
		name: 'compound_id',
		nullable: false,
		type: 'varchar',
	})
	public compoundId!: string;

	@Column({ name: 'user_id', nullable: false, type: 'int' })
	public userId!: number;

	@Field(() => User, { nullable: false })
	@ManyToOne(() => User, user => user.accounts, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn()
	public user!: User;

	@Field(() => String, { nullable: false })
	@Column({
		length: 255,
		name: 'provider_type',
		nullable: false,
		type: 'varchar',
	})
	public providerType!: string;

	@Field(() => String, { nullable: false })
	@Column({
		length: 255,
		name: 'provider_id',
		nullable: false,
		type: 'varchar',
	})
	public providerId!: string;

	@Field(() => String, { nullable: false })
	@Column({
		length: 255,
		name: 'provider_account_id',
		nullable: false,
		type: 'varchar',
	})
	public providerAccountId!: string;

	@Field(() => String, { nullable: true })
	@Column({ name: 'refresh_token', nullable: true, type: 'text' })
	public refreshToken!: null | string;

	@Field(() => String, { nullable: true })
	@Column({ name: 'access_token', nullable: true, type: 'text' })
	public accessToken!: null | string;

	@Field(() => Date, { nullable: true })
	@Column({
		name: 'access_token_expires',
		nullable: true,
		type: 'timestamp',
	})
	public accessTokenExpires!: null | Date;

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
