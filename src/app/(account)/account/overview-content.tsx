"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import { useCartStore } from "@/stores/cart-store"
import {
  Package,
  Heart,
  ShoppingBag,
  MapPin,
  Clock,
  ChevronRight,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { fetchOrders } from "@/features/orders/api/orders-api"

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  delivered: { label: "Đã giao", variant: "default" },
  shipped: { label: "Đang vận chuyển", variant: "secondary" },
  processing: { label: "Đang xử lý", variant: "outline" },
  pending: { label: "Chờ xác nhận", variant: "outline" },
  confirmed: { label: "Đã xác nhận", variant: "default" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function OverviewContent() {
  const { user } = useAuthStore()
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const cartCount = useCartStore((s) => s.items.length)

  const { data, isLoading } = useQuery({
    queryKey: ["orders-overview", user?.id],
    queryFn: () => fetchOrders(user?.id || "guest"),
    enabled: !!user?.id,
  })

  const orders = data?.orders ?? []
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Xin chào, {user?.name || "Người dùng"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Đây là tổng quan tài khoản của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Package className="h-4 w-4" />
              Đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                orders.length
              )}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Tổng số đơn hàng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Heart className="h-4 w-4" />
              Yêu thích
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{wishlistCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Sản phẩm yêu thích</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShoppingBag className="h-4 w-4" />
              Giỏ hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{cartCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">Sản phẩm trong giỏ</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Đơn hàng gần đây</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/account/orders" className="flex items-center gap-1">
              Xem tất cả <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {recentOrders.map((order, i) => (
            <div key={order.id}>
              {i > 0 && <Separator />}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(order.createdAt)}
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={statusLabels[order.status].variant}>
                  {statusLabels[order.status].label}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/account/addresses">
            <MapPin className="mr-2 h-4 w-4" />
            Quản lý địa chỉ
          </Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/account/profile">
            <Heart className="mr-2 h-4 w-4" />
            Cập nhật hồ sơ
          </Link>
        </Button>
      </div>
    </div>
  )
}
