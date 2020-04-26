import { registerEnumType } from 'type-graphql';

enum YesNo {
	N = 'N',
	Y = 'Y',
}

registerEnumType(YesNo, {
	description: 'Yes or No flag',
	name: 'YesNo',
});

export default YesNo;
