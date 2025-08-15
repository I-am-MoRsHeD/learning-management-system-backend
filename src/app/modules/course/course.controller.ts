/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CourseServices } from "./course.service";
import { sendResponse } from "../../utils/sendResponse";
import { ICourse } from "./course.interface";

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.getAllCourses();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Courses retrieved successfully',
        data: result.data,
        meta: result?.meta,
    });
});

const createCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedUser = req.user;
    const payload: ICourse = {
        ...req.body,
        user: decodedUser.userId,
        thumbnail: req.file?.path
    };

    const course = await CourseServices.createCourse(payload);

    sendResponse<ICourse>(res, {
        statusCode: 201,
        success: true,
        message: "Course created successfully",
        data: course
    });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
    const payload: ICourse = {
        ...req.body,
        thumbnail: req.file?.path
    }
    const result = await CourseServices.updateCourse(req.params.id, payload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course updated successfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourse(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course deleted successfully',
        data: result,
    });
});

export const CourseController = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
};