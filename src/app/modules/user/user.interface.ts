import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
};

export interface IUser {
    _id?: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    role: Role;
};