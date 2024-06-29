import { LoginRequestBody, SignUpRequestBody } from "../types";
import User from "../models/user";
import { ErrorMessages } from "../utils/errors-management";

import bcrypt from 'bcryptjs';

const signupService = async (data: SignUpRequestBody) => {
    const user = await User.findOne({ where: { username: data.username } });

    if (user) {
        throw new Error(ErrorMessages.USERNAME_EXISTS);
    }

    let newUser = new User({
        username: data.username,
        password: data.password,
    });

    await newUser.save();

    return newUser;
}

const loginService = async (data: LoginRequestBody) => {
    const user = await User.findOne({ where: { username: data.username } });

    if (!user) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
        throw new Error(ErrorMessages.WRONG_PASSWORD);
    }

    return user;
}

export {
    signupService,
    loginService,
}
