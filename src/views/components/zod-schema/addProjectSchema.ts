import { z } from "zod";

export const addProjectSchema = z.object({
  titleAr: z
    .string()
    .min(1, { message: "العنوان مطلوب!" })
    .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "العنوان يجب أن يكون باللغة العربية فقط!",
    }),
  titleEn: z
    .string()
    .min(1, { message: "Title is required!" })
    .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "Title must be in English only!",
    }),
  descriptionAr: z
    .string()
    .min(1, { message: "الوصف مطلوب!" })
    .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "الوصف يجب أن يكون باللغة العربية فقط!",
    }),
  descriptionEn: z
    .string()
    .min(1, { message: "Description is required!" })
    .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "Description must be in English only!",
    }),
  addressAr: z
    .string()
    .min(1, { message: "العنوان مطلوب!" })
    .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "العنوان يجب أن يكون باللغة العربية فقط!",
    }),
  addressEn: z
    .string()
    .min(1, { message: "Address is required!" })
    .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "Address must be in English only!",
    }),
  type: z.enum(["Residential Area", "Commercial Area"], {
    message: "Type is required!",
  }),
  delivered_status: z.enum(["0", "1"], { message: "Status is required!" }),
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .min(1, { message: "At least one image must be selected!" }),
});

export const updateProductSchema = addProjectSchema.partial();
export type ProjectFormValues = z.infer<typeof addProjectSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProductSchema>;
