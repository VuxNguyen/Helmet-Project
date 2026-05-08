import type { Metadata } from "next"
import { RegisterForm } from "@/features/auth/components/register-form"

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Helmet Pro account and discover premium motorcycle helmets.",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  )
}
