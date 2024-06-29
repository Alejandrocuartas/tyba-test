import Transaction, { TransactionType } from "../models/transaction";

export interface SignUpRequestBody {
    username: string;
    password: string;
}

export interface LoginRequestBody {
    username: string;
    password: string;
}

export interface CreateTransactionRequestBody {
    amount: number;
    type: TransactionType;
}

export interface JWTPayload {
    userId: number;
}

export interface ParamsForAuthenticatedUser {
    userId: number;
};
