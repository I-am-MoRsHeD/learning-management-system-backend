import { deleteImageFromCloudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHelpers/AppError";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const getAllCourses = async () => {
    const courses = await Course.find({})
        .populate("user", "name email")
        .populate("module")
        .populate("lecture");

    const totalCourses = await Course.countDocuments();

    const meta = {
        total: totalCourses
    }

    return {
        data: courses,
        meta: meta
    }
};

const getSingleCourse = async (id: string) => {

    const course = await Course.findById(id)
        .populate("user", "name email")
        .populate("module")
        .populate("lecture");

    return course;
};


const createCourse = async (payload: Partial<ICourse>) => {
    const isCourseTitleExist = await Course.findOne({ title: payload.title });
    if (isCourseTitleExist) {
        throw new Error("Course title already exist");
    };

    const course = await Course.create(payload);
    return course;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {

    const existingCourse = await Course.findById(id);

    if (!existingCourse) {
        throw new AppError(404, "Course not found.");
    }

    // delete the image from cloudinary
    if (payload.thumbnail && existingCourse?.thumbnail) {
        await deleteImageFromCloudinary(existingCourse?.thumbnail);
    };

    const updatedCourse = await Course.findByIdAndUpdate(id, payload, { new: true, runvalidators: true });

    return updatedCourse;
};

const deleteCourse = async (id: string) => {
    const existingCourse = await Course.findById(id);

    if (!existingCourse) {
        throw new AppError(404, "Course not found.");
    };

    return await Course.findByIdAndDelete(id);
};


export const CourseServices = {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
}