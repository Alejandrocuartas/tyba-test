import { CreateTransactionRequestBody } from "../types";
import Transaction, { TransactionStatus } from "../models/transaction";
import { ErrorMessages } from "../utils/errors-management";

const getUserBalance = async (userId: number) => {
    const transactions = await Transaction.findAll({
        where: {
            user_id: userId,
            status: [TransactionStatus.CONFIRMED, TransactionStatus.PENDING],
        }
    });

    const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    return totalAmount;
}

const createTransactionService = async (
    data: CreateTransactionRequestBody,
    userId: number
) => {

    //validate user has enough money for withdrawal or investment
    if (data.amount < 0) {
        const totalAmount = await getUserBalance(userId);
        if (totalAmount < Math.abs(data.amount)) {
            throw new Error(ErrorMessages.NOT_ENOUGH_MONEY);
        }
    }

    let transaction = new Transaction({
        amount: data.amount,
        type: data.type,
        user_id: userId,
        status: TransactionStatus.CONFIRMED,
    });

    await transaction.save();

    return transaction;
}

const getTransactionsService = async (
    userId: number,
    limit: number,
    page: number
) => {

    if (limit < 1 || isNaN(limit)) {
        limit = 10;
    }

    if (page < 1 || isNaN(page)) {
        page = 1;
    }

    const [totalAmount, transactions, totalTransactions] = await Promise.all([
        getUserBalance(userId),
        Transaction.findAll({
            where: {
                user_id: userId,
            },
            limit,
            offset: limit * (page - 1),
            order: [['created_at', 'DESC']],
        }),
        Transaction.count({
            where: {
                user_id: userId,
            },
        }),
    ]);

    return {
        balance: totalAmount,
        transactions,
        total_transactions: totalTransactions,
        page,
        total_pages: Math.ceil(totalTransactions / limit),
        limit,
    };
}

export {
    createTransactionService,
    getTransactionsService,
}
