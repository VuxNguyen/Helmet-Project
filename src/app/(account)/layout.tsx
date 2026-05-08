import type { Metadata } from "next"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { AuthGuard } from "@/components/layout/auth-guard"

export const metadata: Metadata = {
  title: "Tài khoản",
  description: "Quản lý tài khoản Helmet Pro của bạn",
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:py-8">
        <DashboardSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </AuthGuard>
  )
}
