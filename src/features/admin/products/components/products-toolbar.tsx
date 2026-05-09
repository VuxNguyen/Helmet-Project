"use client"

import { Search, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORY_OPTIONS, BRAND_OPTIONS, STATUS_OPTIONS, type ProductStatus } from "../types"

interface ProductsToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  categoryFilter: string | null
  onCategoryChange: (value: string | null) => void
  brandFilter: string | null
  onBrandChange: (value: string | null) => void
  statusFilter: ProductStatus | null
  onStatusChange: (value: ProductStatus | null) => void
  onAddProduct: () => void
}

export function ProductsToolbar({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  brandFilter,
  onBrandChange,
  statusFilter,
  onStatusChange,
  onAddProduct,
}: ProductsToolbarProps) {
  const hasActiveFilters = categoryFilter || brandFilter || statusFilter

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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
            value={categoryFilter ?? "all"}
            onValueChange={(v) => onCategoryChange(v === "all" ? null : v)}
          >
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={brandFilter ?? "all"}
            onValueChange={(v) => onBrandChange(v === "all" ? null : v)}
          >
            <SelectTrigger className="h-8 w-[120px] text-xs">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {BRAND_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter ?? "all"}
            onValueChange={(v) => onStatusChange(v === "all" ? null : v as ProductStatus)}
          >
            <SelectTrigger className="h-8 w-[120px] text-xs">
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
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                onCategoryChange(null)
                onBrandChange(null)
                onStatusChange(null)
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      <Button size="sm" onClick={onAddProduct} className="shrink-0">
        <Plus className="h-3.5 w-3.5" />
        Add Product
      </Button>
    </div>
  )
}
