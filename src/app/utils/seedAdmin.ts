import { envVars } from "../config/env"
import bcrypt from 'bcryptjs';
import { User } from "../modules/user/user.model";
import { IUser, Role } from "../modules/user/user.interface";


export const seedAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: envVars.ADMIN_EMAIL });

        if (isSuperAdminExist) {
            console.log('Admin already exists!');
            return;
        };

        const bcryptedPassword = await bcrypt.hash(envVars.ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUNDS));

        const payload: IUser = {
            fullName: "Admin",
            email: envVars.ADMIN_EMAIL,
            password: bcryptedPassword,
            role: Role.ADMIN,
        }
        const admin = await User.create(payload);
        console.log(admin);
    } catch (error) {
        console.log(error);
    }
}