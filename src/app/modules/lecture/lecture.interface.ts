import { Types } from "mongoose";


export interface ILecture {
    s_no: string;
    title: string;
    videoURL: string;
    pdf_notes?: string[];
    module: Types.ObjectId;
}