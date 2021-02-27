import { TCustomContext } from '../api/graphql';
import { customAuthChecker } from '../src/util/auth';

describe('customAuthChecker', () => {
	it('allows read access to all', () => {
		const context = { userObj: {} } as TCustomContext;
		const result = customAuthChecker(
			{ args: {}, context, info: {} as any, root: {} },
			['reader'],
		);

		expect(result).toBe(true);
	});

	it('allows editor access to signed in users', () => {
		const context = ({ userObj: { sub: '1' } } as unknown) as TCustomContext;
		const result = customAuthChecker(
			{ args: {}, context, info: {} as any, root: {} },
			['editor'],
		);

		expect(result).toBe(true);
	});

	it('denies editor access to unknown users', () => {
		const context = { userObj: {} } as TCustomContext;
		const result = customAuthChecker(
			{ args: {}, context, info: {} as any, root: {} },
			['editor'],
		);

		expect(result).toBe(false);
	});

	it('allows admin access to signed in users', () => {
		const context = ({ userObj: { sub: '1' } } as unknown) as TCustomContext;
		const result = customAuthChecker(
			{ args: {}, context, info: {} as any, root: {} },
			['admin'],
		);

		expect(result).toBe(true);
	});
});
