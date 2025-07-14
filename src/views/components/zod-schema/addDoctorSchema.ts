import { z } from "zod";

export const addDoctorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required!" })
    .refine((value) => /^[A-Za-z\s]*$/.test(value), {
      message: "Name must contain only English letters and spaces!",
    }),
  email: z.string().email({ message: "Invalid email format!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long!" }),
  phone: z.string().min(1, {
    message: "Phone number must be valid and contain 10-15 digits!",
  }),
  specializationId: z
    .string()
    .min(1, { message: "Specialization ID is required!" }),
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .min(1, { message: "At least one image must be selected!" }),
});

export type DoctorFormValues = z.infer<typeof addDoctorSchema>;
export type UpdateDoctorFormValues = z.infer<typeof updateDoctorSchema>;
export const updateDoctorSchema = addDoctorSchema.extend({
  password: z.string().optional(),
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .optional(),
});
