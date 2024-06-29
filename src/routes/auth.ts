import { Router } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/auth';
import validator from '../middlewares/validator';

const authRouter = Router();

authRouter.post(
    '/signup',
    [
        body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        validator,
    ],
    authController.signup,
);

authRouter.post(
    '/login',
    [
        body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        validator,
    ],
    authController.login,
);

export default authRouter;
