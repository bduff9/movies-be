const { CODE_PATH, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

module.exports = {
	name: 'default',
	type: 'mysql',
	host: DB_HOST,
	password: DB_PASSWORD,
	port: DB_PORT,
	username: DB_USERNAME,
	database: 'media_tracker',
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
