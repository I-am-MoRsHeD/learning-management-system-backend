import z from "zod";


export const createLectureZodSchema = z.object({
    title: z
        .string({ error: "Title must be string" })
        .min(2, { message: "Title must be at least 2 characters long." }),
    videoURL: z
        .string({ error: "Video URL must be string" }),
    pdf_notes: z
        .array(z.string()).optional(),
    module: z
        .string({ error: "ModuleId must be string" })
});


export const updateLectureZodSchema = z.object({
    title: z
        .string({ error: "Title must be string" })
        .min(2, { message: "Title must be at least 2 characters long." }).optional(),
    videoURL: z
        .string({ error: "Video URL must be string" }).optional(),
    pdf_notes: z
        .array(z.string()).optional()
});