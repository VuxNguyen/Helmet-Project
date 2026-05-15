import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "validation.emailRequired")
    .email("validation.invalidEmail"),
  password: z
    .string()
    .min(1, "validation.passwordRequired")
    .min(6, "validation.passwordMinLength"),
})

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "validation.fullNameRequired")
      .min(2, "validation.fullNameMinLength"),
    email: z
      .string()
      .min(1, "validation.emailRequired")
      .email("validation.invalidEmail"),
    password: z
      .string()
      .min(1, "validation.passwordRequired")
      .min(8, "validation.passwordMinLength"),
    confirmPassword: z.string().min(1, "validation.confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordsDoNotMatch",
    path: ["confirmPassword"],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
