import { z } from "zod";

export const queryMealSchema = z
  .strictObject({
    maxPrice: z
      .string()
      .regex(/^\d+$/, "maxPrice must be a number")
      .transform(Number),
    availableReservations: z
      .enum(["true", "false"])
      .transform((val) => val === "true")
      .optional(),
    title: z.string().min(1).max(100).trim().toLowerCase().optional(),
    dateAfter: z.coerce.date().optional(),
    dateBefore: z.coerce.date().optional(),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a number")
      .transform(Number)
      .optional(),
    sortKey: z.string().min(1).max(100).trim().toLowerCase().optional(),
    sortDir: z.enum(["asc", "desc"]).optional(),
  })
  .partial();
