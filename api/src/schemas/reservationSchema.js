import { z } from "zod";

export const reservationSchema = z.strictObject({
  number_of_guests: z.coerce
    .number()
    .int()
    .positive("Number of guests must be a positive integer"),
  create_date: z.coerce.date().optional(),
  meal_id: z.coerce
    .number()
    .int()
    .positive("Meal ID must be a positive integer"),
  contact_name: z.string().min(2, "Contact name is required"),
  contact_phonenumber: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number must be no more than 15 digits"),
  contact_email: z.string().email(),
});

export const updateReservationSchema = reservationSchema.partial();
