/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { IModule } from "./module.interface";
import { sendResponse } from "../../utils/sendResponse";
import { ModuleServices } from "./module.service";

const createModule = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const module = await ModuleServices.createModule(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Module created successfully",
        data: module
    });
});

const updateModule = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const module = await ModuleServices.updateModule(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Module updated successfully",
        data: module
    });
});

const deleteModule = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ModuleServices.deleteModule(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Module deleted successfully',
        data: result,
    });
});

export const ModuleController = {
    createModule,
    updateModule,
    deleteModule
};