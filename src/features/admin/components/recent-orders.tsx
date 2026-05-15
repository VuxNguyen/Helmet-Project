"use client"

import { Badge } from "@/components/ui/badge"
import { useAdminOrdersStore } from "@/features/admin/orders/stores/admin-orders-store"
import { useTranslations } from "@/hooks/use-translations"
import { STATUS_CONFIG } from "@/features/admin/orders/types"

export function RecentOrders() {
  const allOrders = useAdminOrdersStore((s) => s.items)
  const recent = allOrders.slice(0, 5)
  const { t } = useTranslations()

  function getStatusClass(status: string): string {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.color ?? ""
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-sm font-semibold">{t("admin.recentOrders.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("admin.recentOrders.description")}</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {t("admin.recentOrders.viewAll")}
        </Badge>
      </div>
      <div className="divide-y divide-border">
        {recent.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {order.customer.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{order.customer.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {order.items.map((i) => i.name).join(", ")} &middot; {order.orderNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Badge variant="outline" className={getStatusClass(order.status)}>
                {order.status}
              </Badge>
              <span className="text-sm font-semibold tabular-nums">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
