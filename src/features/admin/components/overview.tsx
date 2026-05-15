"use client"

import { useMemo } from "react"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { StatsCard } from "./stats-card"
import { RecentOrders } from "./recent-orders"
import { LowStockProducts } from "./low-stock-products"
import { useAdminOrdersStore } from "@/features/admin/orders/stores/admin-orders-store"
import { useAdminCustomersStore } from "@/features/admin/customers/stores/admin-customers-store"
import { useAdminProductsStore } from "@/features/admin/products/stores/admin-products-store"

export function AdminOverview() {
  const orders = useAdminOrdersStore((s) => s.items)
  const customers = useAdminCustomersStore((s) => s.items)
  const products = useAdminProductsStore((s) => s.items)
  const { t } = useTranslations()

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const completedOrders = orders.filter((o) => o.status === "delivered").length
    const pendingOrders = orders.filter((o) => o.status === "pending").length
    const lowStockItems = products.filter((p) => p.stock <= 10).length

    return [
      {
        title: t("admin.overview.totalRevenue"),
        value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: `+${orders.length} orders`,
        trend: "up" as const,
        icon: DollarSign,
      },
      {
        title: t("admin.overview.orders"),
        value: orders.length.toString(),
        change: `${completedOrders} delivered`,
        trend: "up" as const,
        icon: ShoppingCart,
      },
      {
        title: t("admin.overview.customers"),
        value: customers.length.toString(),
        change: `${pendingOrders} pending`,
        trend: customers.length > 0 ? "up" as const : "down" as const,
        icon: Users,
      },
      {
        title: t("admin.overview.lowStock"),
        value: lowStockItems.toString(),
        change: "items need replenishment",
        trend: lowStockItems > 5 ? "down" as const : "up" as const,
        icon: TrendingUp,
      },
    ]
  }, [orders, customers, products, t])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t("admin.overview.heading")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("admin.overview.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <LowStockProducts />
      </div>
    </div>
  )
}
