"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STATUS_OPTIONS, type OrderStatus } from "../types"

interface OrdersToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: OrderStatus | null
  onStatusChange: (value: OrderStatus | null) => void
  dateFrom: string
  onDateFromChange: (value: string) => void
  dateTo: string
  onDateToChange: (value: string) => void
}

export function OrdersToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: OrdersToolbarProps) {
  const hasActiveFilters = statusFilter || dateFrom || dateTo

  const handleClear = () => {
    onStatusChange(null)
    onDateFromChange("")
    onDateToChange("")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-8 w-full pl-8 text-xs"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Select
              value={statusFilter ?? "all"}
              onValueChange={(v) => onStatusChange(v === "all" ? null : v as OrderStatus)}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="hidden items-center gap-2 md:flex">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-xs text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="From"
              />
              <span className="text-xs text-muted-foreground">—</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-xs text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="To"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:hidden">
        <Select
          value={statusFilter ?? "all"}
          onValueChange={(v) => onStatusChange(v === "all" ? null : v as OrderStatus)}
        >
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
