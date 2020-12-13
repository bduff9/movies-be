const { CODE_PATH, database, host, password, port, username } = process.env;

/**
 * @type import("typeorm").ConnectionOptions c
 */
const config = {
	name: 'default',
	type: 'mysql',
	database,
	host,
	password,
	port: port !== undefined ? +port : port,
	username,
	synchronize: true,
	logging: true,
	entities: [`${CODE_PATH}/entity/**/*.js`],
	migrations: [`${CODE_PATH}/migration/**/*.js`],
	subscribers: [`${CODE_PATH}/subscriber/**/*.js`],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};

module.exports = config;
