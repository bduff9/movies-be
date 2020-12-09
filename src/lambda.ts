import middy from '@middy/core';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'reflect-metadata';

import { getGQLServer, runApollo } from './util/apollo';

const serverPromise = getGQLServer();

const graphql = middy(
	async (event: APIGatewayProxyEvent, context: Context): Promise<unknown> => {
		const server = await serverPromise;
		const gqlServer = server.createHandler({
			cors: {
				origin: true,
				credentials: true,
			},
		});
		const response = await runApollo(event, context, gqlServer);

		return response;
	},
);

export const graphqlHandler = graphql;
