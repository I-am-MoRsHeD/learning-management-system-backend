import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcryptjs';


const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(400, 'User already exists');
    };

    const bcryptedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUNDS));

    const user = await User.create({
        email,
        password: bcryptedPassword,
        ...rest,
    });
    return user;
};

const credentialsLogin = async (payload: Partial<IUser>) => {

    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
        throw new AppError(400, 'User does not exist');
    };

    const bcryptedPassword = await bcrypt.compare(password as string, isUserExist.password as string);

    if (!bcryptedPassword) {
        throw new AppError(400, "Password is incorrect");
    };

    const userTokens = createUserTokens(isUserExist);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    };
};


export const UserServices = {
    createUser,
    credentialsLogin
};