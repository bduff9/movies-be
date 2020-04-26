import { registerEnumType } from 'type-graphql';

enum CaseType {
	Box = 'Box',
	Digibook = 'Digibook',
	Plain = 'Plain',
	Slipcover = 'Slipcover',
	Steelbook = 'Steelbook',
}

registerEnumType(CaseType, {
	description: 'The type of case the movie item is in',
	name: 'CaseType',
});

export default CaseType;
