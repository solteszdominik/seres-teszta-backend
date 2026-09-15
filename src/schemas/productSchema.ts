import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "A termék neve kötelező."),

  slug: z
    .string()
    .trim()
    .min(1, "A slug kötelező.")
    .regex(
      /^[a-z0-9-]+$/,
      "A slug csak kisbetűt, számot és kötőjelet tartalmazhat.",
    ),

  description: z.string().trim().nullable().optional(),

  image_url: z
    .string()
    .trim()
    .url("Az image_url érvényes URL legyen.")
    .nullable()
    .optional(),

  price: z
    .number()
    .int("Az ár egész szám legyen.")
    .nonnegative("Az ár nem lehet negatív."),

  package_size: z.string().trim().min(1, "A kiszerelés kötelező."),

  is_featured: z.boolean().optional(),

  is_available: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
