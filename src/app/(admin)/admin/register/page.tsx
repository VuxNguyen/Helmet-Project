import type { Metadata } from "next"
import { AdminRegisterForm } from "@/features/admin/components/admin-register-form"

export const metadata: Metadata = {
  title: "Create Admin Account",
  description: "Register a new admin account for Helmet Pro.",
}

export default function AdminRegisterPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <AdminRegisterForm />
    </div>
  )
}