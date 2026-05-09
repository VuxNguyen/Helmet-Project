"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useAdminStore } from "@/stores/admin-store"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  Percent,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeft,
  LogOut,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Discounts", href: "/admin/discounts", icon: Percent },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

function AdminSidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-14 items-center border-b border-border px-4", collapsed && "justify-center px-2")}>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            H
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-semibold tracking-tight whitespace-nowrap overflow-hidden"
              >
                Helmet Pro
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href + "/"))
            return (
              <TooltipWrapper key={item.href} showTooltip={collapsed} label={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </TooltipWrapper>
            )
          })}
        </nav>
      </ScrollArea>

      <div className={cn("border-t border-border p-3", collapsed && "px-2")}>
        <TooltipWrapper showTooltip={collapsed} label="Sign out">
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              collapsed && "justify-center px-2",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm whitespace-nowrap"
                >
                  Sign out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </TooltipWrapper>
      </div>
    </div>
  )
}

function TooltipWrapper({
  children,
  showTooltip,
  label,
}: {
  children: React.ReactNode
  showTooltip: boolean
  label: string
}) {
  if (!showTooltip) return <>{children}</>

  return (
    <div className="group/tooltip relative">
      {children}
      <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100">
        {label}
      </div>
    </div>
  )
}

export function AdminSidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAdminStore()

  return (
    <aside
      className={cn(
        "hidden border-r border-border bg-background transition-all duration-200 lg:flex lg:flex-col",
        sidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      <AdminSidebarContent collapsed={sidebarCollapsed} />
      <button
        onClick={toggleSidebar}
        className="flex h-8 items-center justify-center border-t border-border text-muted-foreground hover:text-foreground transition-colors"
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </button>
    </aside>
  )
}

export function AdminMobileSidebar() {
  const pathname = usePathname()
  const { isMobileSidebarOpen, closeMobileSidebar } = useAdminStore()

  return (
    <AnimatePresence>
      {isMobileSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeMobileSidebar}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-background shadow-xl lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <Link href="/admin" className="flex items-center gap-2" onClick={closeMobileSidebar}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    H
                  </div>
                  <span className="text-sm font-semibold tracking-tight">Helmet Pro</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={closeMobileSidebar} aria-label="Close sidebar">
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 px-2 py-3">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href + "/"))
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileSidebar}
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
              </ScrollArea>

              <div className="border-t border-border p-3">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <LogOut className="h-4 w-4 shrink-0" />
                  Sign out
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
