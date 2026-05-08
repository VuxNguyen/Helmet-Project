import type { Metadata } from "next"
import { LoginForm } from "@/features/auth/components/login-form"

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Helmet Pro account to manage orders, wishlist, and more.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <LoginForm />
    </div>
  )
}
