import { z } from "zod";

export const addPackageSchema = z.object({
  title_en: z
    .string()
    .min(1, { message: "Title (English) is required!" })
    .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "Title must be in English only!",
    }),

  title_ar: z
    .string()
    .min(1, { message: "العنوان مطلوب!" })
    .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
      message: "العنوان يجب أن يكون باللغة العربية فقط!",
    }),

  price: z.number().min(1, { message: "Monthly price is required!" }),
  active_status: z.enum(["0", "1"], { message: "Active status is required!" }),
  features: z.array(
    z.object({
      title_en: z
        .string()
        .min(1, { message: "Feature title (English) is required!" })
        .refine((value) => /^[A-Za-z\s0-9\p{P}\p{S}]*$/u.test(value), {
          message: "Feature title must be in English only!",
        }),
      title_ar: z
        .string()
        .min(1, { message: "عنوان الميزة مطلوب!" })
        .refine((value) => /^[\u0600-\u06FF\s0-9\p{P}\p{S}]*$/u.test(value), {
          message: "عنوان الميزة يجب أن يكون باللغة العربية فقط!",
        }),
      checked_status: z.enum(["0", "1"], {
        message: "Checked status is required!",
      }),
    })
  ),
});

export const updatePackageSchema = addPackageSchema.partial();
export type PackageFormValues = z.infer<typeof addPackageSchema>;
export type UpdatePackageFormValues = z.infer<typeof updatePackageSchema>;
