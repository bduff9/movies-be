import { registerEnumType } from 'type-graphql';

enum FormatType {
	BluRay = 'Blu-Ray',
	DVD = 'DVD',
	Digital = 'Digital',
	UV = 'UV',
	UltraHD = 'Ultra HD',
}

registerEnumType(FormatType, {
	description: 'The format of the movie item',
	name: 'FormatType',
});

export default FormatType;
