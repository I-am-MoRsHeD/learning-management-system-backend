import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";


const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    module: [{
        type: Schema.Types.ObjectId,
        ref: "Module"
    }],
}, {
    versionKey: false,
    timestamps: true
});

export const Course = model<ICourse>("Course", courseSchema);