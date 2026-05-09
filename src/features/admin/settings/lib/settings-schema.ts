import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Invalid phone number"),
  bio: z.string().max(500, "Bio must be under 500 characters"),
})

export const storeSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  storeEmail: z.string().email("Invalid email address"),
  currency: z.string().min(1, "Currency is required"),
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  description: z.string().max(1000, "Description must be under 1000 characters"),
})

export const notificationSchema = z.object({
  orderConfirmed: z.boolean(),
  orderShipped: z.boolean(),
  orderDelivered: z.boolean(),
  lowStock: z.boolean(),
  newCustomer: z.boolean(),
  reviewSubmitted: z.boolean(),
  marketingEmails: z.boolean(),
  weeklyReport: z.boolean(),
})

export const appearanceSchema = z.object({
  theme: z.enum(["dark", "light", "system"]),
  sidebarBehavior: z.enum(["expanded", "collapsed"]),
  reducedMotion: z.boolean(),
  compactMode: z.boolean(),
})

export const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    twoFactorEnabled: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
