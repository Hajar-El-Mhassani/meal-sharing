import { z } from "zod";
//This schema is used to validate the review before inserting it using Zod.
//This Zod schema checks that the review has a name,
// a message, rating between 1 and 5, and a valid meal ID.
export const reviewSchema = z.strictObject({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  meal_id: z.coerce
    .number()
    .int()
    .positive("Meal ID must be a positive integer"),
  stars: z
    .number()
    .int()
    .positive("Stars must be a positive integer")
    .min(1, "Stars must be at least 1")
    .max(5, "Stars must be at most 5"),
  created_date: z.coerce.date().optional(),
});

export const updateReviewSchema = reviewSchema.partial();
