import { Router } from 'express';
import { body } from 'express-validator';
import transactionsController from '../controllers/transactions';
import validator from '../middlewares/validator';
import { TransactionType } from '../models/transaction';
import createTransactionMiddleware from '../middlewares/transactions';
import validateAuth from '../middlewares/auth';

const transactionsRouter = Router();

transactionsRouter.post('/', [
    validateAuth,
    createTransactionMiddleware,
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('type').isString().custom((value) => {
        if (Object.values(TransactionType).indexOf(value) === -1) {
            throw new Error('Invalid transaction type. Must be one of the following: ' + Object.values(TransactionType).join(', '));
        }
        return true;
    }),
    validator,
], transactionsController.createTransaction);

transactionsRouter.get('/', [
    validateAuth,
], transactionsController.getTransactions);

export default transactionsRouter;
