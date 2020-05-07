import { FindOperator, Like, Between, FindConditions } from 'typeorm';

import CaseType from '../entity/CaseType';
import FilterType from '../entity/FilterType';
import { MovieItem } from '../entity/MovieItem';
import { TFilterType, CountMovieItems } from '../resolver/MovieItemResolver';

const getSQLFilter = <T>(
	filter: TFilterType<T>,
): T | FindOperator<T> | undefined => {
	const { relation, value } = filter;

	switch (filter.relation) {
		case FilterType.between:
			return Between(value, filter.value2);
		case FilterType.like:
			return (Like(`%${value}%`) as unknown) as FindOperator<T>;
		case FilterType.endsWith:
			return (Like(`%${value}`) as unknown) as FindOperator<T>;
		case FilterType.startsWith:
			return (Like(`${value}%`) as unknown) as FindOperator<T>;
		case FilterType.equal:
			return value;
		default:
			console.error('Invalid relation found', relation);

			return;
	}
};

export const convertFiltersToWhere = (
	filters: CountMovieItems,
): FindConditions<MovieItem> => {
	const where: FindConditions<MovieItem> = {};

	if (filters.itemName) {
		where.itemName = getSQLFilter(filters.itemName);
		console.log(where.itemName);
	}

	if (filters.caseType) {
		where.caseType = getSQLFilter<CaseType>(filters.caseType);
	}

	if (filters.digitalType) {
		where.digitalType = getSQLFilter(filters.digitalType);
	}

	if (filters.formatType) {
		where.formatType = getSQLFilter(filters.formatType);
	}

	if (filters.is3D) {
		where.is3D = getSQLFilter(filters.is3D);
	}

	if (filters.itemStatus) {
		where.itemStatus = getSQLFilter(filters.itemStatus);
	}

	if (filters.isWatched) {
		where.isWatched = getSQLFilter(filters.isWatched);
	}

	if (filters.releaseDate) {
		where.releaseDate = getSQLFilter(filters.releaseDate);
	}

	return where;
};
