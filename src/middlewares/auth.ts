import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dbConfig from '../config';
import { JWTPayload, ParamsForAuthenticatedUser } from '../types';

/**
This middleware validates the JWT token and sets the userId on the request params
*/
const validateAuth = (req: Request<ParamsForAuthenticatedUser, {}, {}>, res: Response, next: Function) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ error: 'No token, authorization denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, dbConfig.jwtSecret) as JWTPayload;
        req.params.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token, authorization denied' });
        return;
    }
};

export default validateAuth;
