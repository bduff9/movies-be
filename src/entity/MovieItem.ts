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
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import CaseType from './CaseType';
import DateTypeScalar from './DateType';
import DigitalType from './DigitalType';
import FormatType from './FormatType';
import { Movie } from './Movie';
import StatusType from './StatusType';
import YesNo from './YesNo';

@Index('ORDERED', ['ordered'], { unique: true })
@Index('ITEMNAME', ['itemName'], {})
@Index('ITEMCASE', ['caseType'], {})
@Index('ITEMDIGITL', ['digitalType'], {})
@Index('ITEM3D', ['is3D'], {})
@Index('ITEMWATCH', ['isWatched'], {})
@Index('ITEMFORMAT', ['formatType'], {})
@Index('ITEMSTATUS', ['itemStatus'], {})
@Index('ITEMAVAIL', ['releaseDate'], {})
@Index('ITEMURL', ['itemURL'], {})
@Entity('movitems', { schema: 'media_tracker' })
@ObjectType()
export class MovieItem extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn({ type: 'int', name: 'ITEMID', unsigned: true })
	public itemID!: number;

	@Field(() => Int, { nullable: true })
	@Column('int', { name: 'ORDERED', nullable: true, unique: true })
	public ordered!: number | null;

	@Field()
	@Column('varchar', { name: 'ITEMNAME', length: 99 })
	public itemName!: string;

	@Field(() => CaseType)
	@Column('enum', {
		name: 'ITEMCASE',
		enum: ['Plain', 'Box', 'Slipcover', 'Digibook', 'Steelbook'],
	})
	public caseType!: CaseType;

	@Field(() => DigitalType)
	@Column('enum', {
		name: 'ITEMDIGITL',
		enum: ['None', 'DC', 'UV', 'DC+UV'],
		default: 'None',
	})
	public digitalType!: DigitalType;

	@Field(() => YesNo)
	@Column('enum', { name: 'ITEM3D', enum: ['Y', 'N'], default: 'N' })
	public is3D!: YesNo;

	@Field(() => YesNo)
	@Column('enum', { name: 'ITEMWATCH', enum: ['Y', 'N'], default: 'N' })
	public isWatched!: YesNo;

	@Field(() => FormatType)
	@Column('enum', {
		name: 'ITEMFORMAT',
		enum: ['Blu-ray', 'DVD', 'Ultra HD', 'UV', 'Digital'],
	})
	public formatType!: FormatType;

	@Field(() => StatusType)
	@Column('enum', {
		name: 'ITEMSTATUS',
		enum: ['Owned', 'Wanted', 'Selling', 'Waiting'],
	})
	public itemStatus!: StatusType;

	@Field(() => DateTypeScalar, { nullable: true })
	@Column('date', { name: 'ITEMAVAIL', nullable: true })
	public releaseDate!: Date | null;

	@Field(() => String)
	@Column('varchar', { name: 'ITEMURL', length: 99 })
	public itemURL!: string;

	@Field(() => String, { nullable: true })
	@Column('text', { name: 'ITEMNOTES', nullable: true })
	public itemNotes!: string | null;

	@OneToMany('Movie', 'item')
	public movies!: Movie[];

	@BeforeInsert()
	@BeforeUpdate()
	async updateOrdered (): Promise<void> {
		if (this.isWatched === 'Y' && this.ordered != null) {
			this.ordered = null;

			return;
		}

		if (this.isWatched === 'N' && this.ordered == null) {
			const results = await MovieItem.findOne(undefined, {
				order: { ordered: 'DESC' },
			});
			const prevMax = results?.ordered;
			const newMax = prevMax ? prevMax + 1 : 1;

			this.ordered = newMax;

			return;
		}
	}
}
