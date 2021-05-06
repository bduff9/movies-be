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
import {
	Arg,
	Args,
	ArgsType,
	Authorized,
	Field,
	Int,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';

import { TUserType } from '../../api/graphql';
import { Movie } from '../entity/Movie';

@ArgsType()
class AddMovieInput implements Partial<Movie> {
	@Field(() => Int)
	itemID!: number;

	@Field()
	movieTitle!: string;

	@Field()
	movieURL!: string;
}

@ArgsType()
class UpdateMovieInput implements Partial<Movie> {
	@Field(() => Int, { nullable: true })
	itemID?: number;

	@Field({ nullable: true })
	movieTitle?: string;

	@Field({ nullable: true })
	movieURL?: string;
}

@Resolver(Movie)
export class MovieResolver {
	@Authorized<TUserType>('reader')
	@Query(() => Int)
	async countMovies (): Promise<number> {
		return await Movie.count();
	}

	@Authorized<TUserType>('reader')
	@Query(() => [Movie])
	async movies (@Arg('itemID', () => Int) itemID: number): Promise<Movie[]> {
		return await Movie.find({ itemID });
	}

	@Authorized<TUserType>('editor')
	@Mutation(() => Movie)
	async addMovie (@Args() newMovie: AddMovieInput): Promise<Movie> {
		const movie = Movie.create(newMovie);

		await movie.save();

		return movie;
	}

	@Authorized<TUserType>('editor')
	@Mutation(() => Movie)
	async updateMovie (
		@Arg('movieID', () => Int) movieID: number,
		@Args() data: UpdateMovieInput,
	): Promise<Movie> {
		const movie = await Movie.findOne(movieID);

		if (!movie) throw new Error('Movie not found!');

		Object.assign(movie, data);
		await movie.save();

		return movie;
	}
}
