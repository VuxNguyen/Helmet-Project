"use client"

import { cn } from "@/lib/utils"
import { useFilterStore } from "../stores/filter-store"
import { useProductListing } from "../hooks/use-product-listing"
import { PRICE_RANGES, RATING_OPTIONS } from "../types/product-listing"
import { Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/data/categories"

const CATEGORY_LABELS: Record<string, string> = {
  "full-face": "Full Face",
  modular: "Modular",
  "open-face": "Open Face",
  "3/4": "3/4 Helmet",
}

export function FilterSidebar({ className }: { className?: string }) {
  const filters = useFilterStore((s) => s.filters)
  const setFilter = useFilterStore((s) => s.setFilter)
  const resetFilters = useFilterStore((s) => s.resetFilters)
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount)
  const { availableBrands } = useProductListing()

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Filters
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <Separator />

      {/* Category Filter */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Category
        </h3>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isActive = filters.category === cat.id
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setFilter("category", isActive ? null : cat.id)
                }
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <cat.icon size={14} className="shrink-0" />
                <span>{CATEGORY_LABELS[cat.id] || cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Brand Filter */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Brand
        </h3>
        <div className="space-y-1.5">
          {availableBrands.map((brand) => {
            const isActive = filters.brand === brand
            return (
              <button
                key={brand}
                onClick={() =>
                  setFilter("brand", isActive ? null : brand)
                }
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {brand}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Price Range
        </h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => {
            const isActive =
              filters.minPrice === range.min &&
              filters.maxPrice === range.max
            return (
            <button
                key={range.label}
                onClick={() => {
                  setFilter("minPrice", isActive ? null : (range.min as number | null))
                  setFilter("maxPrice", isActive ? null : (range.max as number | null))
                }}
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {range.label}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Minimum Rating
        </h3>
        <div className="space-y-1.5">
          {RATING_OPTIONS.map((rating) => {
            const isActive = filters.rating === rating
            return (
              <button
                key={rating}
                onClick={() =>
                  setFilter("rating", isActive ? null : rating)
                }
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: rating }, (_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={isActive ? "fill-current" : "fill-amber-400 text-amber-400"}
                    />
                  ))}
                </div>
                <span className="text-xs">& up</span>
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Availability
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() =>
              setFilter("inStock", filters.inStock === true ? null : true)
            }
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
              filters.inStock === true
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            In Stock Only
          </button>
        </div>
      </div>
    </aside>
  )
}