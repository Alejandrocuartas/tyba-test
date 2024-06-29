import { Sequelize } from 'sequelize';
import dbConfig from '../config';

let ssl: undefined | { require: boolean; rejectUnauthorized: boolean } = undefined;
if (process.env.IS_LAMBDA_ENV) {
    ssl = {
        require: true,
        rejectUnauthorized: false,
    };
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: console.log,
    dialectOptions: {
        ssl,
    },
});

export default sequelize;
