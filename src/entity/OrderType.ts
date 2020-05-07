import { registerEnumType } from 'type-graphql';

enum OrderType {
	ASC = 'ASC',
	DESC = 'DESC',
}

registerEnumType(OrderType, {
	description: 'The order direction',
	name: 'OrderType',
});

export default OrderType;
