import { z } from "zod";

export const CreateCategotySchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().max(20),
  type: z.enum(["expense", "income"]),
});


export type CreateCategotySchemaType = z.infer<typeof CreateCategotySchema>;