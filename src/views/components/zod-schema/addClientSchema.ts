import { z } from "zod";

export const addClientSchema = z.object({
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .min(1, { message: "At least one image must be selected!" }),
});

export const updateClientSchema = addClientSchema.partial();
export type clientFormValues = z.infer<typeof addClientSchema>;
export type updateClientFormValues = z.infer<typeof updateClientSchema>;
