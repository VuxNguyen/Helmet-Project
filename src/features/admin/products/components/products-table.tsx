"use client"

import { useMemo } from "react"
import {
  MoreHorizontal,
  Eye,
  Copy,
  Archive,
  Trash2,
  Pencil,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/common/data-table"
import { SortHeader } from "@/components/common/sort-header"
import { ProductStatusBadge } from "./product-status-badge"
import type { AdminProduct } from "../types"
import type { ColumnDef } from "@tanstack/react-table"

interface ProductsTableProps {
  data: AdminProduct[]
  onSelectionChange: (ids: string[]) => void
  onEdit?: (product: AdminProduct) => void
}

export function ProductsTable({ data, onSelectionChange, onEdit }: ProductsTableProps) {
  const columns = useMemo<ColumnDef<AdminProduct>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : table.getIsAllPageRowsSelected()
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "image",
        header: () => null,
        cell: ({ row }) => (
          <div
            className="h-9 w-9 rounded-lg bg-muted bg-cover bg-center shrink-0"
            style={
              row.original.image && row.original.image !== "/placeholder-helmet.svg"
                ? { backgroundImage: `url(${row.original.image})` }
                : undefined
            }
          >
            {(!row.original.image ||
              row.original.image === "/placeholder-helmet.svg") && (
              <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
                {row.original.name.charAt(0)}
              </div>
            )}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 44,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <SortHeader column={column}>Product</SortHeader>
        ),
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="text-sm font-medium truncate max-w-[200px]">
              {row.original.name}
            </p>
            <p className="text-xs text-muted-foreground">{row.original.sku}</p>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <SortHeader column={column}>Category</SortHeader>
        ),
        meta: {
          headerClassName: "hidden md:table-cell",
          cellClassName: "hidden md:table-cell",
        },
        cell: ({ row }) => (
          <Badge variant="outline" className="text-xs capitalize">
            {row.original.category}
          </Badge>
        ),
      },
      {
        accessorKey: "brand",
        header: ({ column }) => (
          <SortHeader column={column}>Brand</SortHeader>
        ),
        meta: {
          headerClassName: "hidden sm:table-cell",
          cellClassName: "hidden sm:table-cell",
        },
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.brand}
          </span>
        ),
      },
      {
        accessorKey: "stock",
        header: ({ column }) => (
          <SortHeader column={column}>Stock</SortHeader>
        ),
        meta: {
          headerClassName: "hidden lg:table-cell",
          cellClassName: "hidden lg:table-cell",
        },
        cell: ({ row }) => {
          const stock = row.original.stock
          return (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      stock === 0
                        ? "text-sm tabular-nums font-medium text-destructive"
                        : stock <= 10
                          ? "text-sm tabular-nums font-medium text-amber-500"
                          : "text-sm tabular-nums font-medium"
                    }
                  >
                    {stock}
                  </span>
                  {stock === 0 && (
                    <span className="text-[10px] font-medium text-destructive uppercase tracking-wider">
                      Out
                    </span>
                  )}
                </div>
                <div className="h-1 w-14 rounded-full bg-muted">
                  <div
                    className={
                      stock === 0
                        ? "h-full rounded-full bg-destructive"
                        : stock <= 10
                          ? "h-full rounded-full bg-amber-500"
                          : "h-full rounded-full bg-emerald-500/60"
                    }
                    style={{
                      width: `${Math.min(100, (stock / 100) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <SortHeader column={column}>Price</SortHeader>
        ),
        cell: ({ row }) => (
          <div className="text-sm tabular-nums">
            <span className="font-medium">
              ${row.original.price.toFixed(2)}
            </span>
            {row.original.originalPrice && (
              <span className="ml-1.5 text-xs text-muted-foreground line-through">
                ${row.original.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <SortHeader column={column}>Status</SortHeader>
        ),
        cell: ({ row }) => <ProductStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Actions"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-3.5 w-3.5" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-3.5 w-3.5" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="h-3.5 w-3.5" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onEdit],
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      onSelectionChange={onSelectionChange}
      enableRowSelection
      getRowId={(row) => row.id}
      pageSize={10}
    />
  )
}
