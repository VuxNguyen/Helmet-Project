"use client"

import { useMemo } from "react"
import { MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/common/data-table"
import { SortHeader } from "@/components/common/sort-header"
import { OrderStatusBadge } from "./order-status-badge"
import type { AdminOrder } from "../types"
import type { ColumnDef } from "@tanstack/react-table"

interface OrdersTableProps {
  data: AdminOrder[]
  onViewDetails: (order: AdminOrder) => void
}

export function OrdersTable({ data, onViewDetails }: OrdersTableProps) {
  const columns = useMemo<ColumnDef<AdminOrder>[]>(
    () => [
      {
        accessorKey: "orderNumber",
        header: ({ column }) => (
          <SortHeader column={column}>Order</SortHeader>
        ),
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="text-sm font-medium">{row.original.orderNumber}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(row.original.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "customer.name",
        header: ({ column }) => (
          <SortHeader column={column}>Customer</SortHeader>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {row.original.customer.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate max-w-[160px]">
                {row.original.customer.name}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                {row.original.customer.email}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "items",
        header: ({ column }) => (
          <SortHeader column={column}>Items</SortHeader>
        ),
        meta: {
          headerClassName: "hidden md:table-cell",
          cellClassName: "hidden md:table-cell",
        },
        cell: ({ row }) => {
          const count = row.original.items.length
          const totalQty = row.original.items.reduce((sum, item) => sum + item.quantity, 0)
          return (
            <span className="text-sm text-muted-foreground">
              {count} item{count !== 1 ? "s" : ""} ({totalQty} qty)
            </span>
          )
        },
      },
      {
        accessorKey: "total",
        header: ({ column }) => (
          <SortHeader column={column}>Total</SortHeader>
        ),
        cell: ({ row }) => (
          <span className="text-sm tabular-nums font-medium">
            ${row.original.total.toFixed(2)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <SortHeader column={column}>Status</SortHeader>
        ),
        cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "paymentMethod",
        header: ({ column }) => (
          <SortHeader column={column}>Payment</SortHeader>
        ),
        meta: {
          headerClassName: "hidden lg:table-cell",
          cellClassName: "hidden lg:table-cell",
        },
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.paymentMethod}
          </span>
        ),
      },
      {
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-xs" aria-label="Actions">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onViewDetails(row.original)}>
                <Eye className="h-3.5 w-3.5" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onViewDetails],
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      pageSize={10}
      emptyMessage="No orders found matching your filters."
    />
  )
}
