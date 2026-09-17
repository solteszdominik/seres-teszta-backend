import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    customer_name: z
      .string()
      .trim()
      .min(2, "A névnek legalább 2 karakterből kell állnia."),

    customer_email: z.string().trim().email("Érvénytelen e-mail cím."),

    customer_phone: z.string().trim().min(7, "Érvénytelen telefonszám."),

    company_name: z.string().trim().max(200, "A cégnév túl hosszú.").optional(),

    postal_code: z
      .string()
      .trim()
      .regex(/^\d{4}$/, "Az irányítószámnak 4 számjegyből kell állnia."),

    city: z.string().trim().min(2, "A település megadása kötelező."),

    street_address: z.string().trim().min(5, "A cím megadása kötelező."),

    message: z.string().trim().max(1000, "Az üzenet túl hosszú.").optional(),

    items: z
      .array(
        z.object({
          product_id: z.string().uuid("Érvénytelen termékazonosító."),

          quantity: z
            .number()
            .int()
            .positive("A mennyiségnek legalább 1-nek kell lennie."),
        }),
      )
      .min(1, "A rendelésnek legalább egy terméket tartalmaznia kell."),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["new", "processing", "completed", "cancelled"]),
  }),
});
