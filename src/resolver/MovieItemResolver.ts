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
import { Max, Min } from 'class-validator';
import {
	Arg,
	Args,
	ArgsType,
	Authorized,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';
import { getRepository } from 'typeorm';

import { TUserType } from '../../api/graphql';
import CaseType from '../entity/CaseType';
import DateTypeScalar from '../entity/DateType';
import DigitalType from '../entity/DigitalType';
import FilterType from '../entity/FilterType';
import FormatType from '../entity/FormatType';
import { MovieItem } from '../entity/MovieItem';
import OrderType from '../entity/OrderType';
import StatusType from '../entity/StatusType';
import YesNo from '../entity/YesNo';
import { convertFiltersToWhere } from '../util/sql';

export type TFilterType<V = string> =
	| { relation: Exclude<FilterType, 'between'>; value: V }
	| { relation: FilterType.between; value: V; value2: V };

type TSortBy = {
	[f: string]: 'ASC' | 'DESC';
};

@InputType()
class StringFilterInput {
	@Field(() => FilterType)
	relation!: FilterType;

	@Field()
	value!: string;

	@Field({ nullable: true })
	value2?: string;
}

@InputType()
class CaseTypeFilterInput {
	@Field(() => FilterType)
	relation!: FilterType;

	@Field(() => CaseType)
	value!: CaseType;

	@Field(() => CaseType, { nullable: true })
	value2?: CaseType;
}

@InputType()
class DigitalTypeFilterInput {
	@Field(() => FilterType)
	relation!: FilterType;

	@Field(() => DigitalType)
	value!: DigitalType;

	@Field(() => DigitalType, { nullable: true })
	value2?: DigitalType;
}

@InputType()
class YesNoFilterInput {
	@Field(() => FilterType)
	relation!: FilterType;

	@Field(() => YesNo)
	value!: YesNo;

	@Field(() => YesNo, { nullable: true })
	value2?: YesNo;
}

@InputType()
class FormatTypeFilterInput {
	@Field(() => FilterType)
	relation!: FilterType;

	@Field(() => FormatType)
	value!: FormatType;

	@Field(() => FormatType, { nullable: true })
	value2?: FormatType;
}

@InputType()
class StatusTypeFilterInput {
	@Field(() => FilterType)
	relation!: FilterType;

	@Field(() => StatusType)
	value!: string;

	@Field(() => StatusType, { nullable: true })
	value2?: StatusType;
}

@InputType()
class DateFilterInput {
	@Field(() => FilterType)
	relation!: FilterType;

	@Field(() => Date)
	value!: Date;

	@Field(() => Date, { nullable: true })
	value2?: Date;
}

@ArgsType()
export class CountMovieItems {
	@Field(() => StringFilterInput, { nullable: true })
	itemName?: TFilterType;

	@Field(() => CaseTypeFilterInput, { nullable: true })
	caseType?: TFilterType<CaseType>;

	@Field(() => DigitalTypeFilterInput, { nullable: true })
	digitalType?: TFilterType<DigitalType>;

	@Field(() => YesNoFilterInput, { nullable: true })
	is3D?: TFilterType<YesNo>;

	@Field(() => YesNoFilterInput, { nullable: true })
	isWatched?: TFilterType<YesNo>;

	@Field(() => FormatTypeFilterInput, { nullable: true })
	formatType?: TFilterType<FormatType>;

	@Field(() => StatusTypeFilterInput, { nullable: true })
	itemStatus?: TFilterType<StatusType>;

	@Field(() => DateFilterInput, { nullable: true })
	releaseDate?: TFilterType<Date>;
}

@InputType({ isAbstract: true })
abstract class OrderBy {
	@Field(() => String)
	field!: keyof MovieItem;

	@Field(() => OrderType)
	direction!: OrderType;
}

@ArgsType()
class GetMovieItemsArgs extends CountMovieItems {
	@Field(() => Int, { defaultValue: 25 })
	@Min(1)
	@Max(100)
	limit = 25;

	@Field(() => Int, { defaultValue: 0 })
	@Min(0)
	skip = 0;

	@Field(() => [OrderBy], { nullable: true })
	order?: OrderBy[];
}

@ArgsType()
class AddMovieItemInput implements Partial<MovieItem> {
	@Field()
	itemName!: string;

	@Field(() => CaseType)
	caseType!: CaseType;

	@Field(() => DigitalType)
	digitalType!: DigitalType;

	@Field(() => YesNo)
	is3D!: YesNo;

	@Field(() => YesNo)
	isWatched!: YesNo;

	@Field(() => FormatType)
	formatType!: FormatType;

	@Field(() => StatusType)
	itemStatus!: StatusType;

	@Field(() => DateTypeScalar, { nullable: true })
	releaseDate!: Date | null;

	@Field()
	itemURL!: string;

	@Field({ nullable: true })
	itemNotes?: string;
}

@ArgsType()
class UpdateMovieItemInput implements Partial<MovieItem> {
	@Field()
	itemName!: string;

	@Field(() => CaseType)
	caseType!: CaseType;

	@Field(() => DigitalType)
	digitalType!: DigitalType;

	@Field(() => YesNo)
	is3D!: YesNo;

	@Field(() => YesNo)
	isWatched!: YesNo;

	@Field(() => FormatType)
	formatType!: FormatType;

	@Field(() => StatusType)
	itemStatus!: StatusType;

	@Field(() => DateTypeScalar, { nullable: true })
	releaseDate!: Date | null;

	@Field()
	itemURL!: string;

	@Field({ nullable: true })
	itemNotes?: string;
}

@Resolver(MovieItem)
export class MovieItemResolver {
	@Authorized<TUserType>('reader')
	@Query(() => Int)
	async countMovieItems (@Args() filters: CountMovieItems): Promise<number> {
		const movieItemRepository = getRepository(MovieItem);
		const where = convertFiltersToWhere(filters);

		return await movieItemRepository.count({
			where,
		});
	}

	@Authorized<TUserType>('reader')
	@Query(() => [MovieItem])
	async movieItems (
		@Args() { limit, skip, order: orderArr, ...filters }: GetMovieItemsArgs,
	): Promise<MovieItem[]> {
		const movieItemRepository = getRepository(MovieItem);
		const order: TSortBy = orderArr
			? orderArr.reduce((ord, { direction, field }): TSortBy => {
				ord[field] = direction;

				return ord;
			}, {} as TSortBy)
			: { itemID: 'ASC' };
		const where = convertFiltersToWhere(filters);

		return await movieItemRepository.find({
			order,
			skip,
			take: limit,
			where,
		});
	}

	@Authorized<TUserType>('reader')
	@Query(() => MovieItem)
	async movieItem (
		@Arg('itemID', () => Int) itemID: number,
	): Promise<MovieItem | undefined> {
		return await MovieItem.findOne({ itemID });
	}

	@Authorized<TUserType>('editor')
	@Mutation(() => MovieItem)
	async addMovieItem (
		@Args()
		newMovieItem: AddMovieItemInput,
	): Promise<MovieItem> {
		const movieItem = MovieItem.create(newMovieItem);

		await movieItem.save();

		return movieItem;
	}

	@Authorized<TUserType>('editor')
	@Mutation(() => MovieItem)
	async markMovieWatched (
		@Arg('itemID', () => Int) itemID: number,
		@Arg('isWatched', () => YesNo) isWatched: YesNo,
	): Promise<MovieItem> {
		const movieItem = await MovieItem.findOne(itemID);

		if (!movieItem) throw new Error('Movie Item not found!');

		movieItem.isWatched = isWatched;
		await movieItem.save();

		return movieItem;
	}

	@Authorized<TUserType>('editor')
	@Mutation(() => MovieItem)
	async updateMovieItem (
		@Arg('itemID', () => Int) itemID: number,
		@Args() data: UpdateMovieItemInput,
	): Promise<MovieItem> {
		const movieItem = await MovieItem.findOne(itemID);

		if (!movieItem) throw new Error('Movie Item not found!');

		Object.assign(movieItem, data);
		await movieItem.save();

		return movieItem;
	}
}
