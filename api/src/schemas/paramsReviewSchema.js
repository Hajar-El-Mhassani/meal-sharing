import { z } from "zod";
export const paramsReviwIdSchema = z.strictObject({
  meal_id: z
    .string()
    .regex(/^\d+$/, "Meal ID must be a number")
    .transform(Number),
});
