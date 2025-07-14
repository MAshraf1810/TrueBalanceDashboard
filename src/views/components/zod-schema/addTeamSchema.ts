import { z } from "zod";

export const addTeamSchema = z.object({
  teamNameAr: z
    .string()
    .min(1, { message: "العنوان مطلوب!" })
    .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "العنوان يجب أن يكون باللغة العربية فقط!",
    }),
  teamNameEn: z
    .string()
    .min(1, { message: "Title is required!" })
    .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "Title must be in English only!",
    }),
  jobTitleAr: z
    .string()
    .min(1, { message: "الوصف مطلوب!" })
    .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "الوصف يجب أن يكون باللغة العربية فقط!",
    }),
  jobTitleEn: z
    .string()
    .min(1, { message: "Description is required!" })
    .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "Description must be in English only!",
    }),
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .min(1, { message: "At least one image must be selected!" }),
});

export const updateTeamSchema = addTeamSchema.partial();
export type teamFormValues = z.infer<typeof addTeamSchema>;
export type UpdateTeamFormValues = z.infer<typeof updateTeamSchema>;
