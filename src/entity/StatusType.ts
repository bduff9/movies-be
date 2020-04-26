import { registerEnumType } from 'type-graphql';

enum StatusType {
	Owned = 'Owned',
	Selling = 'Selling',
	Waiting = 'Waiting',
	Wanted = 'Wanted',
}

registerEnumType(StatusType, {
	description: 'The current status of the movie item',
	name: 'StatusType',
});

export default StatusType;
