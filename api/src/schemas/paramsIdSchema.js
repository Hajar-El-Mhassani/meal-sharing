import { z } from "zod";

export const paramsSchema = z.strictObject({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
});
