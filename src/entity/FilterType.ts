import { registerEnumType } from 'type-graphql';

enum FilterType {
	between = 'between',
	endsWith = 'endsWith',
	equal = 'equal',
	like = 'like',
	startsWith = 'startsWith',
}

registerEnumType(FilterType, {
	description: 'The filter relationship',
	name: 'FilterType',
});

export default FilterType;
