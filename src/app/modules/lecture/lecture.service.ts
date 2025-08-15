/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { Module } from "../module/module.model";
import { ILecture } from "./lecture.interface";
import { Lecture } from "./lecture.model";


const createLecture = async (payload: Partial<ILecture>) => {
    const session = await Lecture.startSession();
    session.startTransaction();

    try {
        const existingModule = await Module.findOne({ _id: payload.module });

        if (!existingModule) {
            throw new AppError(404, "Module not found.");
        };
        const existingTitle = await Lecture.findOne({ title: payload.title });
        if (existingTitle) {
            throw new AppError(400, "Lecture title already exist");
        };
        const lastLecture = await Lecture.findOne({ module: payload.module })
            .sort({ s_no: -1 })
            .select("s_no")
            .session(session);
        const splittedSerialNo = lastLecture ? lastLecture.s_no.split("-") : [0, 0];

        let serialNo = lastLecture ? Number(splittedSerialNo[1]) : 0;
        const newSerialNo = existingModule.moduleNumber + "-" + serialNo++;
        const newPayload = {
            ...payload,
            s_no: newSerialNo
        };

        const lecture = await Lecture.create([newPayload], { session });

        await Module.findByIdAndUpdate(payload.module, { $push: { lecture: lecture[0]._id } }, { new: true, runValidators: true });

        await session.commitTransaction();
        await session.endSession();

        return lecture;
    } catch (error: any) {
        console.log(error);
        await session.abortTransaction();
        throw new AppError(500, error.message as string);
    }
};

const updateLecture = async (id: string, payload: Partial<ILecture>) => {

    const existingLecture = await Lecture.findById(id);

    if (!existingLecture) {
        throw new AppError(404, "Lecture not found.");
    };

    const updatedLecture = await Lecture.findByIdAndUpdate(id, payload, { new: true, runvalidators: true });

    return updatedLecture;
};

const deleteLecture = async (id: string) => {
    const existingLecture = await Lecture.findById(id);

    if (!existingLecture) {
        throw new AppError(404, "Lecture not found.");
    };

    return await Lecture.findByIdAndDelete(id);
};

export const LectureServices = {
    createLecture,
    updateLecture,
    deleteLecture
}