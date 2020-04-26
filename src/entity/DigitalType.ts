import { registerEnumType } from 'type-graphql';

enum DigitalType {
	DC = 'DC',
	DCUV = 'DC+UV',
	None = 'None',
	UV = 'UV',
}

registerEnumType(DigitalType, {
	description: 'The digital movie format included, if any',
	name: 'DigitalType',
});

export default DigitalType;
