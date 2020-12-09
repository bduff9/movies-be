const { CODE_PATH, ...DB_CONFIG } = process.env;

module.exports = {
	name: 'default',
	...DB_CONFIG,
	database: 'media_tracker',
	serviceConfigOptions: {
		// additional options to pass to aws-sdk RDS client
	},
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
