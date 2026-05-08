"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth-store"
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Tổng quan", href: "/account", icon: LayoutDashboard },
  { label: "Đơn hàng", href: "/account/orders", icon: Package },
  { label: "Yêu thích", href: "/account/wishlist", icon: Heart },
  { label: "Địa chỉ", href: "/account/addresses", icon: MapPin },
  { label: "Hồ sơ", href: "/account/profile", icon: UserCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <MobileToggle onClick={() => setMobileOpen(true)} />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-transform duration-200 lg:sticky lg:top-0 lg:block lg:h-screen",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/account" className="text-lg font-semibold tracking-tight">
            Tài khoản
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 px-4 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || "Người dùng"}</span>
            <span className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</span>
          </div>
        </div>

        <Separator />

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Separator />

        <div className="p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  )
}

function MobileToggle({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center gap-2 p-4 pb-0 lg:hidden">
      <Button variant="outline" size="icon" onClick={onClick} aria-label="Open menu">
        <Menu className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">Tài khoản</span>
    </div>
  )
}
