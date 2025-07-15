import { z } from "zod";

export const addBookingSchema = z.object({
  user_name: z.string().min(1, { message: "User name is required!" }),
  user_location: z.string().min(1, { message: "User name is required!" }),
  user_email: z.string().email({ message: "Valid email is required!" }),
  user_phone: z.string().min(7, { message: "Phone number is required!" }),
  service: z.string().min(1, { message: "Service title is required!" }),
  amount: z.number({ required_error: "Amount is required!" }),
  total_session: z.number({ required_error: "Total sessions are required!" }),
  first_session_date: z
    .string()
    .min(1, { message: "First session date is required!" }),
  booking_date: z.string().min(1, { message: "Booking date is required!" }),

  sessions: z
    .array(
      z.object({
        day: z.string().min(1, { message: "Session day is required!" }),
        time: z.string().min(1, { message: "Session time is required!" }),
      }),
      { message: "At least one session is required!" }
    )
    .min(1, { message: "At least one session is required!" }),

  id: z.number({ required_error: "Dog ID is required!" }),
  name: z.string().min(1, { message: "Dog name is required!" }),
  age: z.number({ required_error: "Dog age is required!" }),
  breed: z.string().min(1, { message: "Dog breed is required!" }),
  gender: z.string().min(1, {
    message: "Gender must be Male or Female!",
  }),
  aggression: z.string({ required_error: "Aggression is required!" }),
  fears_phobias: z.string({ required_error: "Fears & phobias is required!" }),
  destructive_behaviors: z.string({
    required_error: "Destructive behavior is required!",
  }),
  excessive_barking_whining: z.string({
    required_error: "Barking/whining is required!",
  }),
  separation_anxiety: z.string({
    required_error: "Separation anxiety is required!",
  }),
  other_behavioral_issues: z.string({
    required_error: "Other issues are required!",
  }),
  additional_info: z.string().optional(),
});

export const updateBookingSchema = addBookingSchema.partial();

export type BookingFormValues = z.infer<typeof addBookingSchema>;
export type UpdateBookingFormValues = z.infer<typeof updateBookingSchema>;
