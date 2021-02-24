import { VercelRequest } from '@vercel/node';
import { decode } from 'jwt-simple';
import { AuthChecker } from 'type-graphql';

import { TCustomContext, TUserType } from '../../api/graphql';

const { JWT_SECRET } = process.env;

export const getUserFromContext = (
	req: VercelRequest,
): Record<string, string> => {
	let userObj = {};

	if (!JWT_SECRET) throw new Error('Missing JWT secret');

	try {
		userObj = decode(
			req.cookies['next-auth.session-token'],
			JWT_SECRET,
			false,
			'HS256',
		);
	} catch (error) {
		console.log({ error });
	}

	return userObj;
};

export const customAuthChecker: AuthChecker<TCustomContext, TUserType> = (
	{ context },
	roles,
) => {
	if (roles.includes('admin') || roles.includes('editor')) {
		return !!context.userObj.sub;
	}

	return true;
};
