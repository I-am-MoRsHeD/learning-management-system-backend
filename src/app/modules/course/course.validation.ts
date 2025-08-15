import z from "zod";



export const createCourseZodSchema = z.object({
    title: z
        .string({ error: "Title must be string" })
        .min(2, { message: "Title must be at least 2 characters long." }),
    description: z
        .string({ error: "Description must be string" })
        .min(5, { message: "Description must be at least 5 characters long." }),
    thumbnail: z
        .string().optional(),
    price: z
        .number({ error: "Price must be number" })
        .min(1, { message: "Price must be at least 1" })
});


export const updateCourseZodSchema = z.object({
    title: z
        .string({ error: "Title must be string" })
        .min(2, { message: "Title must be at least 2 characters long." }).optional(),
    description: z
        .string({ error: "Description must be string" })
        .min(5, { message: "Description must be at least 5 characters long." }).optional(),
    thumbnail: z
        .string().optional(),
    price: z
        .number({ error: "Price must be number" })
        .min(1, { message: "Price must be at least 1" }).optional(),
    module: z.array(z.string()).optional()
});