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

type TCustomContext = {
	context: unknown;
	dbConnection: Connection;
	event: unknown;
	functionName: string;
	headers: string[];
};

export const getGQLServer = async (): Promise<ApolloServer> => {
	const dbConnection = await createConnection();
	const schema = await buildSchema({
		resolvers: [MovieResolver, MovieItemResolver],
	});

	return new ApolloServer({
		context: ({ event, context }): TCustomContext => ({
			context,
			dbConnection,
			event,
			functionName: context.functionName,
			headers: event.headers,
		}),
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

		apollo(event, context, callback);
	});
