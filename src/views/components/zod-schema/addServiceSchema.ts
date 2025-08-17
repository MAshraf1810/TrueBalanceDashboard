import { z } from "zod";

export const addServiceSchema = z.object({
  titleAr: z.string().min(1, { message: "العنوان مطلوب!" }),
  titleEn: z.string().min(1, { message: "Title is required!" }),
  images: z
    .array(z.instanceof(File), {
      message: "Invalid file format!",
    })
    .min(1, { message: "At least one image must be selected!" }),
});

export const updateServiceSchema = addServiceSchema.extend({
  images: z.any(),
});
export type serviceFormValues = z.infer<typeof addServiceSchema>;
export type UpdateServiceFormValues = z.infer<typeof updateServiceSchema>;
