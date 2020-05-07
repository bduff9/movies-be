import { GraphQLScalarType, Kind } from 'graphql';

const DateTypeScalar = new GraphQLScalarType({
	name: 'DateType',
	description: 'A date without time',
	parseValue (value: string): string {
		return value;
	},
	serialize (value: string): string {
		return value;
	},
	parseLiteral (ast): Date | null {
		if (ast.kind === Kind.STRING) {
			return new Date(ast.value);
		}

		return null;
	},
});

export default DateTypeScalar;
