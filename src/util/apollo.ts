import { ApolloServer } from 'apollo-server-lambda';
import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Callback,
	Context,
} from 'aws-lambda';
import { buildSchema } from 'type-graphql';
import { createConnection, Connection } from 'typeorm';

import { MovieItemResolver } from '../resolver/MovieItemResolver';
import { MovieResolver } from '../resolver/MovieResolver';

import { customAuthChecker } from './auth';

export type TUserType = 'admin' | 'user';
type TCognitoClaims = {
	sub: string;
	'cognito:groups': TUserType[];
	email_verified: boolean;
	iss: string;
	'cognito:username': string;
	given_name: string;
	aud: string;
	event_id: string;
	token_use: string;
	auth_time: number;
	exp: number;
	iat: number;
	family_name: string;
	email: string;
};
export type TCustomContext = {
	claims?: null | TCognitoClaims;
	context: unknown;
	dbConnection: Connection;
	event: unknown;
	functionName: string;
	headers: string[];
};

export const getGQLServer = async (): Promise<ApolloServer> => {
	const dbConnection = await createConnection();
	const schema = await buildSchema({
		authChecker: customAuthChecker,
		resolvers: [MovieResolver, MovieItemResolver],
	});

	return new ApolloServer({
		context: ({ event, context }): TCustomContext => {
			const claims = event?.requestContext?.authorizer?.claims;

			return {
				claims,
				context,
				dbConnection,
				event,
				functionName: context.functionName,
				headers: event.headers,
			};
		},
		playground: {
			endpoint: '/dev/graphql',
		},
		schema,
	});
};

export const runApollo = (
	event: APIGatewayProxyEvent,
	context: Context,
	apollo: (
		event: APIGatewayProxyEvent,
		context: Context,
		callback: Callback<APIGatewayProxyResult>,
	) => void,
): Promise<unknown> =>
	new Promise((resolve, reject) => {
		const callback = (error: unknown, body: unknown): void =>
			error ? reject(error) : resolve(body);

		event.httpMethod = event.httpMethod || 'POST';
		event.headers = {
			'content-type': 'application/json',
			...(event.headers || {}),
		};

		apollo(event, context, callback);
	});
