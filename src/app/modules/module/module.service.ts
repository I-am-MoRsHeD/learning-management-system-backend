/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { Course } from "../course/course.model";
import { IModule } from "./module.interface";
import { Module } from "./module.model";


const createModule = async (payload: Partial<IModule>) => {
    const session = await Module.startSession();
    session.startTransaction();

    try {
        const existingCourse = await Course.findOne({ _id: payload.course });

        if (!existingCourse) {
            throw new AppError(404, "Course not found.");
        }
        const lastModule = await Module.findOne({ course: payload.course })
            .sort({ moduleNumber: -1 })
            .select("moduleNumber")
            .session(session);

        const moduleNo = lastModule ? lastModule.moduleNumber : 0;
        const newPayload = {
            ...payload,
            moduleNumber: moduleNo + 1
        };

        const module = await Module.create([newPayload], { session });

        await Course.findByIdAndUpdate(payload.course, { $push: { module: module[0]._id } }, { new: true, runValidators: true });

        await session.commitTransaction();
        await session.endSession();

        return module;
    } catch (error: any) {
        console.log(error);
        await session.abortTransaction();
        throw new AppError(500, error.message as string);
    }
};
const updateModule = async (id: string, payload: Partial<IModule>) => {
    const existingModule = await Module.findById(id);

    if (!existingModule) {
        throw new AppError(404, "Module not found.");
    };

    const updatedModule = await Module.findByIdAndUpdate(id, payload, { new: true, runvalidators: true });

    return updatedModule;
};
const deleteModule = async (id: string) => {
    const existingModule = await Module.findById(id);

    if (!existingModule) {
        throw new AppError(404, "Module not found.");
    };

    return await Module.findByIdAndDelete(id);
};



export const ModuleServices = {
    createModule,
    updateModule,
    deleteModule
};