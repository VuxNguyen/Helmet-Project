"use client"

import { Badge } from "@/components/ui/badge"
import { InventoryItem } from "./inventory-item"
import { useTranslations } from "@/hooks/use-translations"
import { useAdminProductsStore } from "@/features/admin/products/stores/admin-products-store"

export function LowStockProducts() {
  const products = useAdminProductsStore((s) => s.items)
  const lowStock = products.filter((p) => p.stock <= 10).slice(0, 6)
  const { t } = useTranslations()

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-sm font-semibold">{t("admin.lowStock.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("admin.lowStock.description")}</p>
        </div>
        <Badge variant="destructive" className="text-xs">
          {t("admin.lowStock.alerts", { count: lowStock.length })}
        </Badge>
      </div>

      <div className="divide-y divide-border">
        {lowStock.map((product) => (
          <InventoryItem
            key={product.id}
            name={product.name}
            sku={product.sku}
            stock={product.stock}
            threshold={10}
          />
        ))}
      </div>

      <div className="border-t border-border px-6 py-3">
        <button className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          {t("admin.lowStock.viewAll")} &rarr;
        </button>
      </div>
    </div>
  )
}
