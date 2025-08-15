import { model, Schema } from "mongoose";
import { IModule } from "./module.interface";


const moduleSchema = new Schema<IModule>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    moduleNumber: {
        type: Number,
        unique: true
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    lecture: [{
        type: Schema.Types.ObjectId,
        ref: "Lecture"
    }]
}, {
    versionKey: false,
    timestamps: true
});


export const Module = model<IModule>("Module", moduleSchema);