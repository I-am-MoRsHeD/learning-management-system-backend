import z from "zod";


export const createModuleZodSchema = z.object({
    title: z
        .string({ error: "Title must be string" })
        .min(2, { message: "Title must be at least 2 characters long." }),
    course: z
        .string({ error: "CourseId must be string" })
});


export const updateCourseZodSchema = z.object({
    title: z
        .string({ error: "Title must be string" })
        .min(2, { message: "Title must be at least 2 characters long." }).optional(),
    lecture: z
        .array(z.string()).optional()
})