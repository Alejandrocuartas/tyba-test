import { Request, Response } from 'express';
import { CreateTransactionRequestBody } from '../types';
import { ErrorMessages, manageError } from '../utils/errors-management';
import { TransactionType } from '../models/transaction';

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
