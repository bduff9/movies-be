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
	@Authorized('user')
	@Query(() => Int)
	async countMovies (): Promise<number> {
		return await Movie.count();
	}

	@Authorized('user')
	@Query(() => [Movie])
	async movies (@Arg('itemID', () => Int) itemID: number): Promise<Movie[]> {
		return await Movie.find({ itemID });
	}

	@Authorized('admin')
	@Mutation(() => Movie)
	async addMovie (@Args() newMovie: AddMovieInput): Promise<Movie> {
		const movie = Movie.create(newMovie);

		await movie.save();

		return movie;
	}

	@Authorized('admin')
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
