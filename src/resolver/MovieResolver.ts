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
	@Query(() => Int)
	async countMovies (): Promise<number> {
		return await Movie.count();
	}

	@Query(() => [Movie])
	async movies (@Arg('itemID', () => Int) itemID: number): Promise<Movie[]> {
		return await Movie.find({ itemID });
	}

	@Mutation(() => Movie)
	async addMovie (@Args() newMovie: AddMovieInput): Promise<Movie> {
		const movie = Movie.create(newMovie);

		await movie.save();

		return movie;
	}

	@Mutation(() => Movie)
	async updateMovie (
		@Arg('id', () => Int) movieID: number,
		@Args() data: UpdateMovieInput,
	): Promise<Movie> {
		const movie = await Movie.findOne(movieID);

		if (!movie) throw new Error('Movie not found!');

		Object.assign(movie, data);
		await movie.save();

		return movie;
	}
}
