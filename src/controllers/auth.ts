import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { LoginRequestBody, SignUpRequestBody } from '../types';
import { manageError } from '../utils/errors-management';
import { loginService, signupService } from '../services/auth';
import dbConfig from '../config';

/**
This function controls the signup of a user validating REST responses and errors and generating a JWT token
*/
const signup = async (req: Request<{}, {}, SignUpRequestBody>, res: Response) => {
    try {
        const user = await signupService(req.body);

        const token = jwt.sign({ userId: user.id }, dbConfig.jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        manageError(res, error);
        return;
    }
};

/**
This function controls the login of a user validating REST responses and errors and generating a JWT token
*/
const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    try {
        const user = await loginService(req.body);

        const token = jwt.sign({ userId: user.id }, dbConfig.jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        manageError(res, error);
        return;
    }
};

export default {
    signup,
    login,
};
