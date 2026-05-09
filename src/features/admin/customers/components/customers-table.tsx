"use client"

import { useMemo } from "react"
import { MoreHorizontal, Eye, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/common/data-table"
import { SortHeader } from "@/components/common/sort-header"
import { CustomerStatusBadge } from "./customer-status-badge"
import type { AdminCustomer } from "../types"
import type { ColumnDef } from "@tanstack/react-table"

interface CustomersTableProps {
  data: AdminCustomer[]
  onViewDetails: (customer: AdminCustomer) => void
}

export function CustomersTable({ data, onViewDetails }: CustomersTableProps) {
  const columns = useMemo<ColumnDef<AdminCustomer>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <SortHeader column={column}>Customer</SortHeader>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {row.original.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate max-w-[180px]">
                {row.original.name}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                {row.original.email}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <SortHeader column={column}>Location</SortHeader>
        ),
        meta: {
          headerClassName: "hidden md:table-cell",
          cellClassName: "hidden md:table-cell",
        },
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.city}, {row.original.state}
          </span>
        ),
      },
      {
        accessorKey: "totalOrders",
        header: ({ column }) => (
          <SortHeader column={column}>Orders</SortHeader>
        ),
        cell: ({ row }) => (
          <span className="text-sm tabular-nums font-medium">
            {row.original.totalOrders}
          </span>
        ),
      },
      {
        accessorKey: "totalSpent",
        header: ({ column }) => (
          <SortHeader column={column}>Spent</SortHeader>
        ),
        cell: ({ row }) => (
          <div className="text-sm tabular-nums">
            <span className="font-medium">
              ${row.original.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <p className="text-xs text-muted-foreground">
              ${row.original.averageOrderValue.toFixed(2)} / order
            </p>
          </div>
        ),
      },
      {
        accessorKey: "lastOrderDate",
        header: ({ column }) => (
          <SortHeader column={column}>Last Order</SortHeader>
        ),
        meta: {
          headerClassName: "hidden lg:table-cell",
          cellClassName: "hidden lg:table-cell",
        },
        cell: ({ row }) => {
          const date = new Date(row.original.lastOrderDate)
          const now = new Date()
          const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

          return (
            <span className="text-sm text-muted-foreground">
              {diffDays === 0 ? "Today" : diffDays === 1 ? "Yesterday" : `${diffDays} days ago`}
            </span>
          )
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <SortHeader column={column}>Status</SortHeader>
        ),
        cell: ({ row }) => <CustomerStatusBadge status={row.original.status} />,
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
              <DropdownMenuItem>
                <Mail className="h-3.5 w-3.5" />
                Send Email
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
      emptyMessage="No customers found matching your filters."
    />
  )
}
