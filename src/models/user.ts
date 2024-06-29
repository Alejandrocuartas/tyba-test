import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";

import bcrypt from 'bcryptjs';
import Transaction from "./transaction";

class User extends Model {
    id!: number;
    username!: string;
    password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 30],
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}
);

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.hasMany(Transaction, {
    foreignKey: 'user_id',
});

User.sync({ alter: true });

export default User;
