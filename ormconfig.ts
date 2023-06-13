/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

import { DataSource, DataSourceOptions } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;

export const options: DataSourceOptions = {
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT ? +DB_PORT : 5432,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	migrationsTableName: 'migrations',
	migrations: [],
	synchronize: NODE_ENV !== 'production'
};

export const AppDataSource = new DataSource(options);
