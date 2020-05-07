import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'reflect-metadata';

import { getGQLServer, runApollo } from './util/apollo';

const serverPromise = getGQLServer();

export const graphqlHandler = async (
	event: APIGatewayProxyEvent,
	context: Context,
): Promise<unknown> => {
	const server = await serverPromise;
	const gqlServer = server.createHandler({
		cors: {
			origin: true,
			credentials: true,
		},
	});
	const response = await runApollo(event, context, gqlServer);

	return response;
};
