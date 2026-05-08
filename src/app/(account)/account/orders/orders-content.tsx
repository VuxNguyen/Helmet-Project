"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Search,
  ChevronDown,
  Clock,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const orders = [
  { id: "ORD-001", date: "2026-04-28", total: 899.99, status: "delivered" as const, items: [{ name: "Arai RX-7X Evo", qty: 1, price: 899.99 }] },
  { id: "ORD-002", date: "2026-05-01", total: 1299.98, status: "shipped" as const, items: [{ name: "Shoei X-Fifteen", qty: 1, price: 799.99 }, { name: "AGV Pista GP RR", qty: 1, price: 1499.99 }] },
  { id: "ORD-003", date: "2026-05-05", total: 549.99, status: "processing" as const, items: [{ name: "Scorpion EXO-R1 Air", qty: 1, price: 549.99 }] },
  { id: "ORD-004", date: "2026-03-15", total: 499.99, status: "delivered" as const, items: [{ name: "HJC RPHA 91", qty: 1, price: 499.99 }] },
  { id: "ORD-005", date: "2026-02-20", total: 1499.99, status: "cancelled" as const, items: [{ name: "AGV Pista GP RR", qty: 1, price: 1499.99 }] },
]

const statusConfig: Record<string, { label: string; icon: typeof Package; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  delivered: { label: "Đã giao", icon: PackageCheck, variant: "default" },
  shipped: { label: "Đang vận chuyển", icon: Truck, variant: "secondary" },
  processing: { label: "Đang xử lý", icon: Clock, variant: "outline" },
  cancelled: { label: "Đã hủy", icon: XCircle, variant: "destructive" },
}

export function OrdersContent() {
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lịch sử đơn hàng</h1>
        <p className="mt-1 text-muted-foreground">
          Xem và theo dõi tất cả đơn hàng của bạn
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm đơn hàng..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12">
            <Package className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Không tìm thấy đơn hàng nào</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            const isExpanded = expanded === order.id

            return (
              <Card key={order.id}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                  className="w-full text-left"
                >
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium">{order.id}</CardTitle>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={status.variant}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </div>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <CardContent className="space-y-3 pt-0">
                    <Separator />
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.name} x{item.qty}</span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>Tổng cộng</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Mua lại
                    </Button>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
