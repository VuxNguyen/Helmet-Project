import { z } from "zod"

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Name must be at least 2 characters"),
  brand: z.string().min(1, "Please select a brand"),
  category: z.string().min(1, "Please select a category"),
  sku: z.string().min(1, "SKU is required"),
  price: z
    .number()
    .positive("Price must be greater than 0"),
  comparePrice: z.number().optional(),
  stock: z
    .number()
    .int("Must be a whole number")
    .min(0, "Stock must be 0 or more"),
  status: z.enum(["active", "draft"]),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
})

export type ProductFormValues = z.infer<typeof productFormSchema>
