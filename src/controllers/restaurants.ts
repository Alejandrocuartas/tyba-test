import { Request, Response } from 'express';
import { getRestaurantsService } from '../services/restaurants';
import { manageError } from '../utils/errors-management';

const getRestaurantsController = async (req: Request<{}, {}, {}, { location: string, next_page_token?: string }>, res: Response) => {
    try {
        const { location } = req.query;
        const restaurants = await getRestaurantsService(location, req.query.next_page_token);
        res.status(200).json(restaurants);
    } catch (error) {
        manageError(res, error);
        return;
    }
};

export {
    getRestaurantsController,
};
