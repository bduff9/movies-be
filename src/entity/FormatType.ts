import { registerEnumType } from 'type-graphql';

enum FormatType {
	BluRay = 'Blu-ray',
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
