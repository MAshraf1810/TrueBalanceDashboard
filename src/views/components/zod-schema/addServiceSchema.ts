import { z } from "zod";

export const addServiceSchema = z.object({
  titleAr: z
    .string()
    .min(1, { message: "العنوان مطلوب!" })
    .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "الوصف يجب أن يكون باللغة العربية فقط!",
    }),
  titleEn: z
    .string()
    .min(1, { message: "Title is required!" })
    .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "Description must be in English only!",
    }),
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .min(1, { message: "At least one image must be selected!" }),
});

export const updateServiceSchema = addServiceSchema.partial();
export type serviceFormValues = z.infer<typeof addServiceSchema>;
export type UpdateServiceFormValues = z.infer<typeof updateServiceSchema>;
