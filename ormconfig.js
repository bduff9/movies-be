const { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

console.log({ DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME });

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
	entities: ['.build/src/entity/**/*.js'],
	migrations: ['.build/src/migration/**/*.js'],
	subscribers: ['.build/src/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
