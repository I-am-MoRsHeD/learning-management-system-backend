/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { LectureServices } from "./lecture.service";
import { ILecture } from "./lecture.interface";


const createLecture = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload: Partial<ILecture> = {
        ...req.body,
        pdf_notes: (req.files as Express.Multer.File[])?.map(file => file.path)
    };
    const lecture = await LectureServices.createLecture(payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Lecture created successfully",
        data: lecture
    });
});

const updateLecture = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const module = await LectureServices.updateLecture(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Lecture updated successfully",
        data: module
    });
});

const deleteLecture = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await LectureServices.deleteLecture(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Lecture deleted successfully',
        data: result,
    });
});

export const LectureController = {
    createLecture,
    updateLecture,
    deleteLecture
}