"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type OnChangeFn,
  type Updater,
  type RowSelectionState,
  type RowData,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { DataTablePagination } from "./data-table-pagination"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClassName?: string
    cellClassName?: string
  }
}

interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData>[]
  data: TData[]
  onSelectionChange?: (ids: string[]) => void
  getRowId?: (row: TData) => string
  enableRowSelection?: boolean
  pageSize?: number
  pageSizes?: number[]
  emptyMessage?: string
  className?: string
}

export function DataTable<TData extends object>({
  columns,
  data,
  onSelectionChange,
  getRowId,
  enableRowSelection = false,
  pageSize = 10,
  pageSizes,
  emptyMessage = "No results found.",
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const selectionCallbackRef = useRef(onSelectionChange)
  selectionCallbackRef.current = onSelectionChange

  const dataRef = useRef(data)
  dataRef.current = data

  const handleSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (updaterOrValue: Updater<RowSelectionState>) => {
      const newSelection =
        typeof updaterOrValue === "function"
          ? updaterOrValue(rowSelection)
          : updaterOrValue
      setRowSelection(newSelection)
    },
    [rowSelection],
  )

  useEffect(() => {
    if (!selectionCallbackRef.current) return
    const ids = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((idx) => {
        const item = dataRef.current[Number(idx)]
        return item ? (item as Record<string, unknown>).id as string : undefined
      })
      .filter(Boolean) as string[]
    selectionCallbackRef.current(ids)
  }, [rowSelection])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: handleSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection,
    getRowId,
  })

  return (
    <div className={cn("rounded-xl border border-border bg-card", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.column.columnDef.meta?.headerClassName}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.cellClassName}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pageSizes={pageSizes} />
    </div>
  )
}
