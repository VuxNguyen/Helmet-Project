"use client"

import { useCallback } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OrderStatusBadge } from "./order-status-badge"
import { STATUS_CONFIG, STATUS_TRANSITIONS, type AdminOrder, type OrderStatus } from "../types"
import { toast } from "sonner"
import {
  Package,
  MapPin,
  CreditCard,
  FileText,
  ChevronRight,
  Clock,
} from "lucide-react"

interface OrderDetailsDrawerProps {
  order: AdminOrder | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function OrderDetailsDrawer({
  order,
  open,
  onOpenChange,
  onStatusUpdate,
}: OrderDetailsDrawerProps) {
  const handleStatusUpdate = useCallback(
    (newStatus: OrderStatus) => {
      if (!order) return
      onStatusUpdate(order.id, newStatus)
      toast.success(`Order ${order.orderNumber} updated to ${STATUS_CONFIG[newStatus].label}`)
    },
    [order, onStatusUpdate],
  )

  if (!order) return null

  const allowedTransitions = STATUS_TRANSITIONS[order.status]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 gap-0"
        showCloseButton={false}
      >
        <SheetHeader className="px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <SheetTitle className="text-base font-semibold">
                {order.orderNumber}
              </SheetTitle>
              <SheetDescription className="text-xs">
                Placed on {formatDate(order.createdAt)}
              </SheetDescription>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-5">
          <div className="space-y-6">
            {/* Status Actions */}
            {allowedTransitions.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Update Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allowedTransitions.map((status) => (
                    <Button
                      key={status}
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(status)}
                      className="text-xs"
                    >
                      {status === "cancelled" ? (
                        <span className="text-destructive">Mark Cancelled</span>
                      ) : (
                        <>
                          Mark {STATUS_CONFIG[status].label}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Customer */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {order.customer.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer
                </h4>
              </div>
              <p className="text-sm font-medium">{order.customer.name}</p>
              <p className="text-xs text-muted-foreground">{order.customer.email}</p>
            </div>

            <Separator />

            {/* Shipping Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Shipping Address
                </h4>
              </div>
              <p className="text-sm">{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && (
                <p className="text-sm">{order.shippingAddress.line2}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
              </p>
              <p className="text-sm text-muted-foreground">{order.shippingAddress.country}</p>
            </div>

            <Separator />

            {/* Payment */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Payment
                </h4>
              </div>
              <p className="text-sm">{order.paymentMethod}</p>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Items ({order.items.length})
                </h4>
              </div>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        SKU: {item.sku} &middot; Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm tabular-nums font-medium shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Order Summary
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="tabular-nums">
                    {order.shipping === 0 ? (
                      <span className="text-emerald-500">FREE</span>
                    ) : (
                      `$${order.shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="tabular-nums">${order.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {order.notes && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Notes
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              </>
            )}

            <Separator />

            {/* Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Timeline
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order placed</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                {order.status !== "pending" && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center mt-0.5">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          order.status === "cancelled"
                            ? "bg-destructive"
                            : "bg-emerald-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Status updated to {STATUS_CONFIG[order.status].label}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(order.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
