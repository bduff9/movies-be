const { CODE_PATH, ...DB_CONFIG } = process.env;

/**
 * @type import("typeorm").ConnectionOptions c
 */
module.exports = {
	...DB_CONFIG,
	name: 'default',
	type: 'mysql',
	synchronize: true,
	logging: false,
	entities: [`${CODE_PATH}/entity/**/*.js`],
	migrations: [`${CODE_PATH}/migration/**/*.js`],
	subscribers: [`${CODE_PATH}/subscriber/**/*.js`],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
