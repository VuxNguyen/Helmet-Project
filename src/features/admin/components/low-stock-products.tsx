import { Badge } from "@/components/ui/badge"
import { InventoryItem } from "./inventory-item"

const lowStockProducts = [
  { name: "Full Face Carbon Pro", sku: "FF-2024-001", stock: 3, threshold: 20 },
  { name: "Modular Adventure X", sku: "MD-2024-008", stock: 5, threshold: 15 },
  { name: "Open Face Classic", sku: "OF-2024-012", stock: 8, threshold: 25 },
  { name: "Dual Sport Elite", sku: "DS-2024-004", stock: 0, threshold: 10 },
  { name: "Half Shell Cruiser", sku: "HS-2024-019", stock: 12, threshold: 30 },
  { name: "Youth Dirt Racer", sku: "YD-2024-022", stock: 2, threshold: 15 },
]

export function LowStockProducts() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-sm font-semibold">Low Stock Products</h3>
          <p className="text-xs text-muted-foreground">Items needing replenishment.</p>
        </div>
        <Badge variant="destructive" className="text-xs">
          {lowStockProducts.length} alerts
        </Badge>
      </div>

      <div className="divide-y divide-border">
        {lowStockProducts.map((product) => (
          <InventoryItem
            key={product.sku}
            name={product.name}
            sku={product.sku}
            stock={product.stock}
            threshold={product.threshold}
          />
        ))}
      </div>

      <div className="border-t border-border px-6 py-3">
        <button className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          View all products &rarr;
        </button>
      </div>
    </div>
  )
}
