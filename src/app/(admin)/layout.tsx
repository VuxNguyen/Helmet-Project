import type { Metadata } from "next"
import { AdminLayoutClient } from "./admin-layout-client"

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | Helmet Pro",
    template: "%s | Admin | Helmet Pro",
  },
  description: "Helmet Pro admin dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
