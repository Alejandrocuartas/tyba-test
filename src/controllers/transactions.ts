import { Request, Response } from 'express';
import { manageError } from '../utils/errors-management';
import { CreateTransactionRequestBody, ParamsForAuthenticatedUser } from '../types';
import { createTransactionService, getTransactionsService } from '../services/transactions';

const createTransaction = async (req: Request<ParamsForAuthenticatedUser, {}, CreateTransactionRequestBody>, res: Response) => {
    try {
        const transaction = await createTransactionService(req.body, req.params.userId);
        res.status(201).json({ transaction });
    } catch (error) {
        manageError(res, error);
        return;
    }
}

const getTransactions = async (req: Request<ParamsForAuthenticatedUser, {}, {}, { limit: number, page: number }>, res: Response) => {
    try {
        const transactions = await getTransactionsService(req.params.userId, +req.query.limit, +req.query.page);
        res.status(200).json(transactions);
    } catch (error) {
        manageError(res, error);
        return;
    }
}

export default {
    createTransaction,
    getTransactions,
};
