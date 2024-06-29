import * as dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

import Server from './server';

const app = new Server();

app.listen();

export const handler = serverless(app.app);
