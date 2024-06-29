import { Response } from "express";

export enum ErrorMessages {
    USERNAME_EXISTS = 'Username already exists',
    USER_NOT_FOUND = 'User not found',
    WRONG_PASSWORD = 'Wrong password',
    TRANSACTION_AMOUNT_ZERO = 'Transaction amount must not be 0',
    WRONG_AMOUNT_FOR_NEGATIVE_TRANSACTION = 'Transaction amount must be smaller than 0 for WITHDRAW and INVESTMENT transactions',
    WRONG_AMOUNT_FOR_POSITIVE_TRANSACTION = 'Transaction amount must be greater than 0 for DEPOSIT and PROFIT transactions',
    NOT_ENOUGH_MONEY = 'Not enough money',
}

export const manageError = (response: Response, error: any) => {
    console.log(error);
    switch (error.message) {
        case ErrorMessages.USERNAME_EXISTS:
            response.status(409).json({ error: error.message });
            break;
        case ErrorMessages.USER_NOT_FOUND:
            response.status(404).json({ error: error.message });
            break;
        case ErrorMessages.WRONG_PASSWORD:
            response.status(401).json({ error: error.message });
            break;
        case ErrorMessages.TRANSACTION_AMOUNT_ZERO:
            response.status(400).json({ error: error.message });
            break;
        case ErrorMessages.WRONG_AMOUNT_FOR_NEGATIVE_TRANSACTION:
            response.status(400).json({ error: error.message });
            break;
        case ErrorMessages.WRONG_AMOUNT_FOR_POSITIVE_TRANSACTION:
            response.status(400).json({ error: error.message });
            break;
        case ErrorMessages.NOT_ENOUGH_MONEY:
            response.status(400).json({ error: error.message });
            break;
        default:
            response.status(500).json({ error: 'Unexpected server error' });
            break;
    }
}
