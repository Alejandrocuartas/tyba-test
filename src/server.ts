import express from 'express';
import cors from 'cors';

import getEnvironmentVariable from './utils/environment';
import authRouter from './routes/auth';
import transactionsRouter from './routes/transactions';
import restaurantsRouter from './routes/restaurants';

/**
This class is used to create the Express app and to set the middlewares and routes and any other configuration of the app
*/
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
        this.app.use('/v1/restaurants', restaurantsRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening at', this.port);
        });
    }
}

export default ServerModel;
