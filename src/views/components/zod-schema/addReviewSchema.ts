import { z } from "zod";

const textSchema = z.object({
    en: z.string().min(1, { message: "English text is required" }),
    ar: z.string().min(1, { message: "Arabic text is required" }),
});

export const addReviewSchema = z.object({
    text: textSchema,
    image: z
        .any()
        .refine((file) => file instanceof File || typeof file === "string", {
            message: "Image is required",
        }),
});

export const updateReviewSchema = z.object({
    text: textSchema.partial().optional(),
    image: z
        .any()
        .refine((file) => file instanceof File || typeof file === "string", {
            message: "Image is required",
        })
        .optional(),
});

export type ReviewFormValues = z.infer<typeof addReviewSchema>;
export type UpdateReviewFormValues = z.infer<typeof updateReviewSchema>;