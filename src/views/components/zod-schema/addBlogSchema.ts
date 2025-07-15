// addBlogSchema.ts
import { z } from "zod";

const titleSchema = z.object({
    en: z.string().min(1, { message: "English title is required" }),
    ar: z.string().min(1, { message: "Arabic title is required" }),
});

const textSchema = z.object({
    en: z.string().min(1, { message: "English text is required" }),
    ar: z.string().min(1, { message: "Arabic text is required" }),
});

export const addBlogSchema = z.object({
    title: titleSchema,
    text: textSchema,
    status: z.enum(["0", "1"], {
        required_error: "Status is required",
    }),
    background: z
        .any()
        .refine(
            (file) => file instanceof File || typeof file === "string",
            { message: "Image is required" }
        ),
});

export const updateBlogSchema = z.object({
    title: titleSchema.partial().optional(),
    text: textSchema.partial().optional(),
    status: z.enum(["0", "1"]).optional(),
    background: z
        .any()
        .refine(
            (file) => file instanceof File || typeof file === "string",
            { message: "Image is required" }
        )
        .optional(),
});

export type BlogFormValues = z.infer<typeof addBlogSchema>;
export type UpdateBlogFormValues = z.infer<typeof updateBlogSchema>;