import { Types } from "mongoose";


export interface IModule {
    title: string,
    moduleNumber: number,
    course: Types.ObjectId,
    lecture?: Types.ObjectId[]
};