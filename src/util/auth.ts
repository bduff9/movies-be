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
import { VercelRequest } from '@vercel/node';
import { AuthChecker } from 'type-graphql';

import { TCustomContext, TUserType } from '../../api/graphql';
import { User } from '../entity';

export const getUserFromContext = async (req: VercelRequest): Promise<null | User> => {
	const token = req.headers.authorization?.replace('Bearer ', '');

	if (!token) return null;

	const user = await User.createQueryBuilder('U')
		.innerJoin('U.sessions', 'S')
		.where('S.access_token = :token', {
			token,
		})
		.getOne();

	return user || null;
};

export const customAuthChecker: AuthChecker<TCustomContext, TUserType> = (
	{ context },
	roles,
) => {
	console.log('Context user obj: ', context.userObj);

	if (roles.includes('admin') || roles.includes('editor')) {
		return !!context.userObj?.id;
	}

	return true;
};
