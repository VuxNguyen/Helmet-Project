"use client"

import { cn } from "@/lib/utils"
import { useFilterStore } from "../stores/filter-store"
import { useProductListing } from "../hooks/use-product-listing"
import { PRICE_RANGES, RATING_OPTIONS } from "../types/product-listing"
import { Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/data/categories"
import { useTranslations } from "@/hooks/use-translations"

export function FilterSidebar({ className }: { className?: string }) {
  const { t } = useTranslations()
  const filters = useFilterStore((s) => s.filters)
  const setFilter = useFilterStore((s) => s.setFilter)
  const resetFilters = useFilterStore((s) => s.resetFilters)
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount)
  const { availableBrands } = useProductListing()

  const CATEGORY_LABELS: Record<string, string> = {
    "full-face": t("categories.fullface.name"),
    modular: t("categories.modular.name"),
    "open-face": t("categories.openFace.name"),
    "3/4": t("categories.threeQuarter.name"),
  }

  function getPriceRangeLabel(range: (typeof PRICE_RANGES)[number]): string {
    if (range.min === null) {
      return t("products_ext.priceRanges.under").replace("{{amount}}", String(range.max))
    }
    if (range.max === null) {
      return t("products_ext.priceRanges.over").replace("{{amount}}", String(range.min))
    }
    return t("products_ext.priceRanges.range")
      .replace("{{min}}", String(range.min))
      .replace("{{max}}", String(range.max))
  }

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {t("products.filters")}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            {t("products.clearAll")}
          </button>
        )}
      </div>

      <Separator />

      {/* Category Filter */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("products.category")}
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
          {t("products.brand")}
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
          {t("products.priceRange")}
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
                {getPriceRangeLabel(range)}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("products.minimumRating")}
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
                <span className="text-xs">{t("products.ratingUp")}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("products.availability")}
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
            {t("products.inStockOnly")}
          </button>
        </div>
      </div>
    </aside>
  )
}