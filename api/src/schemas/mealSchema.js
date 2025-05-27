import { z } from "zod";

export const createMealSchema = z.strictObject({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  when: z.coerce.date().refine((date) => date > new Date(), {
    message: "When must be a future date",
  }),
  max_reservation: z
    .number()
    .int()
    .positive("Max reservation must be a positive integer"),
  price: z.number().positive("Price must be a positive number"),
  created_date: z.coerce.date().optional(),
});

export const paramsSchema = z.strictObject({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
});
export const updateMealSchema = createMealSchema.partial();
