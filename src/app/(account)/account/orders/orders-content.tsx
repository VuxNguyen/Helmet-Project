"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
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
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth-store"
import { fetchOrders } from "@/features/orders/api/orders-api"

const statusConfig: Record<string, { label: string; icon: typeof Package; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  delivered: { label: "Đã giao", icon: PackageCheck, variant: "default" },
  shipped: { label: "Đang vận chuyển", icon: Truck, variant: "secondary" },
  processing: { label: "Đang xử lý", icon: Clock, variant: "outline" },
  pending: { label: "Chờ xác nhận", icon: Clock, variant: "outline" },
  confirmed: { label: "Đã xác nhận", icon: PackageCheck, variant: "default" },
  cancelled: { label: "Đã hủy", icon: XCircle, variant: "destructive" },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function OrdersContent() {
  const user = useAuthStore((s) => s.user)
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => fetchOrders(user?.id || "guest"),
    enabled: !!user?.id,
  })

  const orders = data?.orders ?? []

  const filtered = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase())),
      ),
    [orders, search],
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

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12">
            <Package className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Không tìm thấy đơn hàng nào</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending
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
                        <CardTitle className="text-sm font-medium">{order.orderNumber}</CardTitle>
                        <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
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
                        <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
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
