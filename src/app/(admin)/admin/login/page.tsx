import type { Metadata } from "next"
import { AdminLoginForm } from "@/features/admin/components/admin-login-form"

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Sign in to Helmet Pro admin dashboard.",
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <AdminLoginForm />
    </div>
  )
}