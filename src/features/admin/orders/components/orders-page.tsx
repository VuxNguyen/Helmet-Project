"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { toast } from "sonner"
import { OrdersToolbar } from "./orders-toolbar"
import { OrdersTable } from "./orders-table"
import { OrderDetailsDrawer } from "./order-details-drawer"
import { useAdminOrdersStore } from "../stores/admin-orders-store"
import { useTranslations } from "@/hooks/use-translations"
import { STATUS_CONFIG, type AdminOrder, type OrderStatus } from "../types"

export function OrdersPage() {
  const { t } = useTranslations()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const updateOrderStatus = useAdminOrdersStore((s) => s.updateOrderStatus)
  const getFiltered = useAdminOrdersStore((s) => s.getFiltered)
  const fetchItems = useAdminOrdersStore((s) => s.fetchItems)
  const allOrders = useAdminOrdersStore((s) => s.items)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const filteredOrders = useMemo(
    () =>
      getFiltered({
        search,
        status: statusFilter,
        dateFrom,
        dateTo,
      }),
    [search, statusFilter, dateFrom, dateTo, getFiltered],
  )

  const handleViewDetails = useCallback((order: AdminOrder) => {
    setSelectedOrder(order)
    setDrawerOpen(true)
  }, [])

  const handleStatusUpdate = useCallback(
    (orderId: string, newStatus: OrderStatus) => {
      updateOrderStatus(orderId, newStatus)
      const updated = allOrders.find((o) => o.id === orderId)
      setSelectedOrder(updated ?? null)
      toast.success(
        t("admin.orders.statusUpdated", { status: STATUS_CONFIG[newStatus].label }),
      )
    },
    [updateOrderStatus, allOrders],
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t("admin.orders.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("admin.orders.description")}
        </p>
      </div>

      <OrdersToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
      />

      <OrdersTable
        data={filteredOrders}
        onViewDetails={handleViewDetails}
      />

      <OrderDetailsDrawer
        order={selectedOrder}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}
