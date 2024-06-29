import { Router } from 'express';
import { query } from 'express-validator';

import { getRestaurantsController } from '../controllers/restaurants';
import validator from '../middlewares/validator';
import validateAuth from '../middlewares/auth';

const restaurantsRouter = Router();

restaurantsRouter.get(
    '/',
    [validateAuth, query('location').exists().withMessage('location is required on query params'), validator],
    getRestaurantsController,
);

export default restaurantsRouter;
