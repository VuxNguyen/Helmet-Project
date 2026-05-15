"use client"

import { useState, useEffect } from "react"
import { DollarSign, ShoppingCart, Users, TrendingUp, Loader2 } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { StatsCard } from "./stats-card"
import { RecentOrders } from "./recent-orders"
import { LowStockProducts } from "./low-stock-products"
import { fetchAdminStats, type AdminStats } from "@/features/admin/api/admin-api"
import { useAdminOrdersStore } from "@/features/admin/orders/stores/admin-orders-store"
import { useAdminProductsStore } from "@/features/admin/products/stores/admin-products-store"

export function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const fetchOrders = useAdminOrdersStore((s) => s.fetchItems)
  const fetchProducts = useAdminProductsStore((s) => s.fetchItems)
  const { t } = useTranslations()

  useEffect(() => {
    fetchOrders()
    fetchProducts()
    fetchAdminStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [fetchOrders, fetchProducts])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const statCards = [
    {
      title: t("admin.overview.totalRevenue"),
      value: `$${(stats?.totalRevenue ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: `${stats?.revenueChange ?? 0}% vs last month`,
      trend: (stats?.revenueChange ?? 0) >= 0 ? "up" as const : "down" as const,
      icon: DollarSign,
    },
    {
      title: t("admin.overview.orders"),
      value: String(stats?.totalOrders ?? 0),
      change: `${stats?.ordersChange ?? 0} vs last month`,
      trend: (stats?.ordersChange ?? 0) >= 0 ? "up" as const : "down" as const,
      icon: ShoppingCart,
    },
    {
      title: t("admin.overview.customers"),
      value: String(stats?.totalCustomers ?? 0),
      change: `Conversion: ${stats?.conversionRate ?? 0}%`,
      trend: "up" as const,
      icon: Users,
    },
    {
      title: t("admin.overview.lowStock"),
      value: String(stats?.lowStockProducts?.length ?? 0),
      change: "items need replenishment",
      trend: (stats?.lowStockProducts?.length ?? 0) > 5 ? "down" as const : "up" as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t("admin.overview.heading")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("admin.overview.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
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
