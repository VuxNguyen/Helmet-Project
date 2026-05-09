"use client"

import { useEffect } from "react"
import { AdminSidebar, AdminMobileSidebar } from "@/components/layout/admin-sidebar"
import { AdminTopbar } from "@/components/layout/admin-topbar"
import { AdminContent } from "@/components/layout/admin-content"

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
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
