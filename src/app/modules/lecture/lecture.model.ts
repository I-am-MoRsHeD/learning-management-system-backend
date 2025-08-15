import { model, Schema } from "mongoose";
import { ILecture } from "./lecture.interface";


const lectureSchema = new Schema<ILecture>({
    s_no: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    videoURL: {
        type: String,
        required: true
    },
    pdf_notes: {
        type: [String]
    },
    module: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Module'
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Lecture = model<ILecture>("Lecture", lectureSchema);