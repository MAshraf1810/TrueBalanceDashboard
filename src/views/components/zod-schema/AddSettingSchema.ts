import { z } from "zod";

const AddSettingSchema = z.object({
  titleEn: z.string().min(1, "Title (English) is required"),
  titleAr: z.string().min(1, "Title (Arabic) is required"),
  addressEn: z.string().min(1, "Address (English) is required"),
  addressAr: z.string().min(1, "Address (Arabic) is required"),
  // phones: z.array(z.string().min(1, "Phone number is required")),
  phones: z.union([z.array(z.string()), z.null()]),
  mobiles: z.union([z.array(z.string()), z.null()]),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  facebook: z.string().url().optional(),
  x: z.string().url().optional(),
  tiktok: z.string().url().optional(),
  instagram: z.string().url().optional(),
  youTube: z.string().url().optional(),

  long: z.string().min(1, "Longitude is required"),
  lat: z.string().min(1, "Latitude is required"),
});

export const updateSettingSchema = AddSettingSchema;
export type updateSettingFormValues = z.infer<typeof updateSettingSchema>;
