"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Table } from "@tanstack/react-table"

interface DataTablePaginationProps<TData extends object> {
  table: Table<TData>
  pageSizes?: number[]
}

export function DataTablePagination<TData extends object>({
  table,
  pageSizes = [5, 10, 20, 50],
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getPrePaginationRowModel().rows.length
  const pageCount = table.getPageCount()
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  if (totalRows === 0) return null

  return (
    <div className="flex items-center justify-between border-t border-border px-6 py-3">
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{startRow}</span> to{" "}
        <span className="font-medium text-foreground">{endRow}</span> of{" "}
        <span className="font-medium text-foreground">{totalRows}</span> results
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Rows</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="h-7 w-[60px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>

          {pageCount > 0 &&
            Array.from({ length: pageCount }, (_, i) => i + 1)
              .filter((page) => {
                if (pageCount <= 7) return true
                if (page === 1 || page === pageCount) return true
                if (Math.abs(page - (pageIndex + 1)) <= 1) return true
                return false
              })
              .map((page, idx, arr) => {
                const showEllipsis = idx > 0 && page - arr[idx - 1] > 1
                return (
                  <span key={page} className="flex items-center">
                    {showEllipsis && (
                      <span className="flex h-7 w-5 items-center justify-center text-xs text-muted-foreground">
                        ...
                      </span>
                    )}
                    <Button
                      variant={page === pageIndex + 1 ? "default" : "ghost"}
                      size="icon-xs"
                      onClick={() => table.setPageIndex(page - 1)}
                      aria-label={`Page ${page}`}
                      className="text-xs"
                    >
                      {page}
                    </Button>
                  </span>
                )
              })}

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
