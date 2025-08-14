/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./user.interface";
import { UserServices } from "./user.service";
import { setCookies } from "../../utils/setCookies";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse<IUser>(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: user
    });
});

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await UserServices.credentialsLogin(req.body);
    setCookies(res, loginInfo);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: loginInfo
    })
});

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
        data: null
    })
});



export const UserController = {
    createUser,
    credentialsLogin,
    logout
};