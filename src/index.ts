import * as dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

import Server from './server';

const app = new Server();

//IS_LAMBDA_ENV is set to true when running in AWS Lambda
if (!process.env.IS_LAMBDA_ENV) {
    app.listen();
}

export const handler = serverless(app.app);
