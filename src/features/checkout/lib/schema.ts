import { z } from "zod";

export const shippingAddressSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-+()]{7,20}$/, "Invalid phone number"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address is too long"),
  apartment: z.string().max(100, "Apartment info is too long").optional(),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City name is too long"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State name is too long"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z
    .string()
    .min(1, "Country is required"),
});

export const checkoutFormSchema = z.object({
  shippingAddress: shippingAddressSchema,
  shippingMethod: z.enum(["standard", "express", "next-day"]),
  paymentMethod: z.enum(["credit-card", "paypal", "stripe"]),
  cardNumber: z.string(),
  cardName: z.string(),
  expiryDate: z.string(),
  cvv: z.string(),
  saveInfo: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "credit-card") {
    if (!data.cardNumber || data.cardNumber.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Card number is required", path: ["cardNumber"] });
    }
    if (!data.cardName || data.cardName.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Cardholder name is required", path: ["cardName"] });
    }
    if (!data.expiryDate || data.expiryDate.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Expiry date is required", path: ["expiryDate"] });
    }
    if (!data.cvv || data.cvv.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CVV is required", path: ["cvv"] });
    }
  }
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;