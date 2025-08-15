import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";
import { Module } from "../module/module.model";
import { Lecture } from "../lecture/lecture.model";


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
    }]
}, {
    versionKey: false,
    timestamps: true
});


courseSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        const modules = await Module.find({ course: doc._id }).select("_id");
        const moduleIds = modules.map(m => m._id);

        await Lecture.deleteMany({ module: { $in: moduleIds } });

        await Module.deleteMany({ course: doc._id });
    }
});

export const Course = model<ICourse>("Course", courseSchema);