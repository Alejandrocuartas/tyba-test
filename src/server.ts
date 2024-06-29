import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth';
import transactionsRouter from './routes/transactions';
import getEnvironmentVariable from './utils/environment';

class ServerModel {
    private origin
    private port
    app
    constructor() {
        this.app = express();

        this.origin = '*';
        this.port = getEnvironmentVariable('PORT');

        this.middlewares();
        this.routes();

    }

    middlewares() {
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(cors({
            origin: this.origin,
        }));
    }

    routes() {
        this.app.use('/v1/auth', authRouter)
        this.app.use('/v1/transactions', transactionsRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening at', this.port);
        });
    }
}

export default ServerModel;
