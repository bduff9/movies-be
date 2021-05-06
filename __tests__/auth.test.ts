/*******************************************************************************
 * Movies BE - the backend implementation of a movie tracker.
 * Copyright (C) 2015-present Brian Duffey and Billy Alexander
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 * Home: https://asitewithnoname.com/
 */
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
