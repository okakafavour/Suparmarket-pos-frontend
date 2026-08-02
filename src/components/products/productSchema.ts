import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  description: z.string().optional(),

  sku: z.string().min(2, "SKU is required"),

  barcode: z.string().optional(),

  category_id: z.string().min(1, "Please select a category"),

  supplier_id: z.string().min(1, "Please select a supplier"),

  cost_price: z.coerce
    .number()
    .min(0, "Cost price cannot be negative"),

  selling_price: z.coerce
    .number()
    .min(0, "Selling price cannot be negative"),

  quantity: z.coerce
    .number()
    .min(0, "Quantity cannot be negative"),

  minimum_stock: z.coerce
    .number()
    .min(0, "Minimum stock cannot be negative"),
});

export type ProductFormValues = z.infer<typeof productSchema>;