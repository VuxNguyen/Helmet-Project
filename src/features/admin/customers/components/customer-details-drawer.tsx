"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CustomerStatusBadge } from "./customer-status-badge"
import { OrderStatusBadge } from "@/features/admin/orders/components/order-status-badge"
import type { AdminCustomer } from "../types"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Package,
} from "lucide-react"

interface CustomerDetailsDrawerProps {
  customer: AdminCustomer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function CustomerDetailsDrawer({
  customer,
  open,
  onOpenChange,
}: CustomerDetailsDrawerProps) {
  if (!customer) return null

  const diff = Math.floor(
    (Date.now() - new Date(customer.lastOrderDate).getTime()) /
      (1000 * 60 * 60 * 24),
  )
  const lastOrderLabel =
    diff === 0 ? "today" : diff === 1 ? "yesterday" : `${diff} days ago`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 gap-0"
        showCloseButton={false}
      >
        <SheetHeader className="px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
              {customer.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <SheetTitle className="text-base font-semibold truncate">
                {customer.name}
              </SheetTitle>
              <SheetDescription className="text-xs truncate">
                {customer.email}
              </SheetDescription>
              <div className="pt-1">
                <CustomerStatusBadge status={customer.status} />
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-5">
          <div className="space-y-6">
            {/* Spending Overview */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Spending Overview
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Total Spent
                  </span>
                  <p className="mt-1 text-lg font-bold tracking-tight tabular-nums">
                    ${customer.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Orders
                  </span>
                  <p className="mt-1 text-lg font-bold tracking-tight tabular-nums">
                    {customer.totalOrders}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Avg Order Value
                  </span>
                  <p className="mt-1 text-lg font-bold tracking-tight tabular-nums">
                    ${customer.averageOrderValue.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Member Since
                  </span>
                  <p className="mt-1 text-sm font-semibold tabular-nums">
                    {formatDate(customer.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Contact
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    {customer.city}, {customer.state}, {customer.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    Joined {formatDate(customer.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    Last order {lastOrderLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {customer.tags.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tags
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {customer.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Order History */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Recent Orders
                </h4>
              </div>
              {customer.recentOrders.length > 0 ? (
                <div className="space-y-2">
                  {customer.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted/80"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(order.createdAt)} &middot; {order.items} item{order.items > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <OrderStatusBadge status={order.status} />
                        <span className="text-sm tabular-nums font-medium">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              )}
            </div>

            {customer.totalOrders > customer.recentOrders.length && (
              <p className="text-xs text-center text-muted-foreground">
                Showing {customer.recentOrders.length} of {customer.totalOrders} orders
              </p>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
