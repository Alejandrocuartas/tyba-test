import { DataTypes, Model } from 'sequelize';
import sequelize from './connection';

/**
- DEPOSIT: The user deposits money to the account.
- WITHDRAW: The user withdraws money from the account.
- PROFIT: The user had a profit on any investment.
- INVESTMENT: The user invests money in any investment opportunity.
*/
export enum TransactionType {
    // eslint-disable-next-line no-unused-vars
    DEPOSIT = 'DEPOSIT',
    // eslint-disable-next-line no-unused-vars
    WITHDRAW = 'WITHDRAW',
    // eslint-disable-next-line no-unused-vars
    PROFIT = 'PROFIT',
    // eslint-disable-next-line no-unused-vars
    INVESTMENT = 'INVESTMENT',
}

export enum TransactionStatus {
    // eslint-disable-next-line no-unused-vars
    PENDING = 'PENDING',
    // eslint-disable-next-line no-unused-vars
    CONFIRMED = 'CONFIRMED',
    // eslint-disable-next-line no-unused-vars
    FAILED = 'FAILED',
}

class Transaction extends Model {
    id!: number;
    type!: TransactionType;
    amount!: number;
    status!: TransactionStatus;
    user_id!: number;
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(TransactionType),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(TransactionStatus),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

Transaction.sync({ alter: true });

export default Transaction;
