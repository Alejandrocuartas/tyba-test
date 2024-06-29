import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    PROFIT = 'PROFIT',
    INVESTMENT = 'INVESTMENT',
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED',
}

class Transaction extends Model {
    id!: number;
    type!: TransactionType;
    amount!: number;
    status!: TransactionStatus;
    user_id!: number;
}

Transaction.init({
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
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}
);

Transaction.sync({ alter: true });

export default Transaction;
