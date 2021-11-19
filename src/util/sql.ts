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
import { FindOperator, Like, Between, FindConditions } from 'typeorm';

import CaseType from '../entity/CaseType';
import FilterType from '../entity/FilterType';
import { MovieItem } from '../entity/MovieItem';
import { TFilterType, CountMovieItems } from '../resolver/MovieItemResolver';

const getSQLFilter = <T>(filter: TFilterType<T>): T | FindOperator<T> | undefined => {
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
