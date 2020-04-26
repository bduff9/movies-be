import { Max, Min } from 'class-validator';
import {
	Arg,
	Args,
	ArgsType,
	Field,
	Int,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';
import { getRepository } from 'typeorm';

import CaseType from '../entity/CaseType';
import DigitalType from '../entity/DigitalType';
import FormatType from '../entity/FormatType';
import { MovieItem } from '../entity/MovieItem';
import StatusType from '../entity/StatusType';
import YesNo from '../entity/YesNo';

@ArgsType()
class CountMovieItems implements Partial<MovieItem> {
	@Field({ nullable: true })
	itemName?: string;

	@Field(() => CaseType, { nullable: true })
	caseType?: CaseType;

	@Field(() => DigitalType, { nullable: true })
	digitalType?: DigitalType;

	@Field(() => YesNo, { nullable: true })
	is3D?: YesNo;

	@Field(() => YesNo, { nullable: true })
	isWatched?: YesNo;

	@Field(() => FormatType, { nullable: true })
	formatType?: FormatType;

	@Field(() => StatusType, { nullable: true })
	itemStatus?: StatusType;

	@Field(() => Date, { nullable: true })
	releaseDate?: Date;
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

	@Field(() => [String, String], { nullable: true })
	order?: [string, string];
}

@ArgsType()
class AddMovieItemInput implements Partial<MovieItem> {
	@Field()
	itemName!: string;

	@Field(() => CaseType, { nullable: true })
	caseType?: CaseType;

	@Field(() => DigitalType, { nullable: true })
	digitalType?: DigitalType;

	@Field(() => YesNo, { nullable: true })
	is3D?: YesNo;

	@Field(() => YesNo, { nullable: true })
	isWatched?: YesNo;

	@Field(() => FormatType, { nullable: true })
	formatType?: FormatType;

	@Field(() => StatusType, { nullable: true })
	itemStatus?: StatusType;

	@Field(() => Date)
	releaseDate!: Date;

	@Field()
	itemURL!: string;

	@Field({ nullable: true })
	itemNotes?: string;
}

@ArgsType()
class UpdateMovieItemInput implements Partial<MovieItem> {
	@Field({ nullable: true })
	itemName?: string;

	@Field(() => CaseType, { nullable: true })
	caseType?: CaseType;

	@Field(() => DigitalType, { nullable: true })
	digitalType?: DigitalType;

	@Field(() => YesNo, { nullable: true })
	is3D?: YesNo;

	@Field(() => YesNo, { nullable: true })
	isWatched?: YesNo;

	@Field(() => FormatType, { nullable: true })
	formatType?: FormatType;

	@Field(() => StatusType, { nullable: true })
	itemStatus?: StatusType;

	@Field(() => Date, { nullable: true })
	releaseDate?: Date;

	@Field({ nullable: true })
	itemURL?: string;

	@Field({ nullable: true })
	itemNotes?: string;
}

@Resolver(MovieItem)
export class MovieItemResolver {
	@Query(() => Int)
	async countMovieItems (@Args() filters: CountMovieItems): Promise<number> {
		const movieItemRepository = getRepository(MovieItem);

		return await movieItemRepository.count({
			where: filters,
		});
	}

	@Query(() => MovieItem)
	async movieItem (
		@Arg('itemID', () => Int) itemID: number,
	): Promise<MovieItem | undefined> {
		return await MovieItem.findOne({ itemID });
	}

	@Query(() => [MovieItem])
	async movieItems (
		@Args() { limit, skip, order, ...filters }: GetMovieItemsArgs,
	): Promise<MovieItem[]> {
		const movieItemRepository = getRepository(MovieItem);
		const orderCol = order ? order[0] : 'itemID';
		const orderDir = order ? (order[1] as 'ASC' | 'DESC') : 'ASC';
		const ordered = { [orderCol]: orderDir };

		return await movieItemRepository.find({
			order: ordered,
			skip,
			take: limit,
			where: filters,
		});
	}

	@Mutation(() => MovieItem)
	async addMovieItem (
		@Args()
		newMovieItem: AddMovieItemInput,
	): Promise<MovieItem> {
		const movieItem = MovieItem.create(newMovieItem);

		await movieItem.save();

		return movieItem;
	}

	@Mutation(() => MovieItem)
	async markMovieWatched (
		@Arg('id', () => Int) id: number,
		@Arg('isWatched', () => YesNo) isWatched: YesNo,
	): Promise<MovieItem> {
		const movieItem = await MovieItem.findOne(id);

		if (!movieItem) throw new Error('Movie Item not found!');

		movieItem.isWatched = isWatched;
		await movieItem.save();

		return movieItem;
	}

	@Mutation(() => MovieItem)
	async updateMovieItem (
		@Arg('id', () => Int) id: number,
		@Args() data: UpdateMovieItemInput,
	): Promise<MovieItem> {
		const movieItem = await MovieItem.findOne(id);

		if (!movieItem) throw new Error('Movie Item not found!');

		Object.assign(movieItem, data);
		await movieItem.save();

		return movieItem;
	}
}
