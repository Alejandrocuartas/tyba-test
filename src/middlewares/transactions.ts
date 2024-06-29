import { Request, Response } from 'express';
import { CreateTransactionRequestBody } from '../types';
import { ErrorMessages, manageError } from '../utils/errors-management';
import { TransactionType } from '../models/transaction';

/**
This middleware validates the transaction request body.

- The amount cannot be 0.

- The amount must be positive for transactions that add money to the user's balance. 

- The amount must be negative for transactions that remove money from the user's balance.
*/
const createTransactionMiddleware = (req: Request<{}, {}, CreateTransactionRequestBody>, res: Response, next: Function) => {
    try {

        if (req.body.amount === 0) {
            throw new Error(ErrorMessages.TRANSACTION_AMOUNT_ZERO);
        }

        const negativeTransactionTypes = [TransactionType.WITHDRAW, TransactionType.INVESTMENT];
        if (negativeTransactionTypes.includes(req.body.type) && req.body.amount > 0) {
            throw new Error(ErrorMessages.WRONG_AMOUNT_FOR_NEGATIVE_TRANSACTION);
        }

        const positiveTransactionTypes = [TransactionType.DEPOSIT, TransactionType.PROFIT];
        if (positiveTransactionTypes.includes(req.body.type) && req.body.amount < 0) {
            throw new Error(ErrorMessages.WRONG_AMOUNT_FOR_POSITIVE_TRANSACTION);
        }

        next();
    } catch (error) {
        manageError(res, error);
        return;
    }

};

export default createTransactionMiddleware;
