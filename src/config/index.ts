import { Dialect } from 'sequelize';
import getEnvironmentVariable from '../utils/environment';

const envConfig = {
    development: {
        username: getEnvironmentVariable('DB_USERNAME'),
        password: getEnvironmentVariable('DB_PASSWORD'),
        database: getEnvironmentVariable('DB_NAME'),
        host: getEnvironmentVariable('DB_HOST'),
        port: Number(getEnvironmentVariable('DB_PORT')),
        jwtSecret: getEnvironmentVariable('JWT_SECRET'),
        dialect: 'postgres' as Dialect,
    },
    test: {
        username: getEnvironmentVariable('DB_USERNAME'),
        password: getEnvironmentVariable('DB_PASSWORD'),
        database: getEnvironmentVariable('DB_NAME'),
        host: getEnvironmentVariable('DB_HOST'),
        port: Number(getEnvironmentVariable('DB_PORT')),
        jwtSecret: getEnvironmentVariable('JWT_SECRET'),
        dialect: 'postgres' as Dialect,
    },
    production: {
        username: getEnvironmentVariable('DB_USERNAME'),
        password: getEnvironmentVariable('DB_PASSWORD'),
        database: getEnvironmentVariable('DB_NAME'),
        host: getEnvironmentVariable('DB_HOST'),
        port: Number(getEnvironmentVariable('DB_PORT')),
        jwtSecret: getEnvironmentVariable('JWT_SECRET'),
        dialect: 'postgres' as Dialect,
    },
};

const env = process.env.NODE_ENV || 'development';

if (['development', 'test', 'production'].indexOf(env) === -1) {
    throw new Error(`Unknown environment ${env}`);
}

const dbConfig = envConfig[env as 'development' | 'test' | 'production'];

export default dbConfig;
