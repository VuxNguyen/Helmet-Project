"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar, AdminMobileSidebar } from "@/components/layout/admin-sidebar"
import { AdminTopbar } from "@/components/layout/admin-topbar"
import { AdminContent } from "@/components/layout/admin-content"
import { useAuthStore } from "@/stores/auth-store"

const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/register"]

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuthStore()

  const isPublicRoute = PUBLIC_ADMIN_ROUTES.includes(pathname)

  useEffect(() => {
    if (isPublicRoute) return

    if (!isAuthenticated) {
      router.replace("/admin/login")
      return
    }

    if (user?.role !== "admin") {
      router.replace("/admin/login")
    }
  }, [isAuthenticated, isPublicRoute, user, router])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [])

  // For public admin routes (login/register), render without sidebar
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Don't render the admin shell if not authenticated (redirect will happen)
  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <AdminMobileSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminTopbar />
        <AdminContent>{children}</AdminContent>
      </div>
    </div>
  )
}