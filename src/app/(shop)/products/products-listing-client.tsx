"use client"

import { FilterSidebar } from "@/features/products/components/filter-sidebar"
import { MobileFilterDrawer } from "@/features/products/components/mobile-filter-drawer"
import { SortDropdown } from "@/features/products/components/sort-dropdown"
import { SearchBar } from "@/features/products/components/search-bar"
import { ProductListingGrid } from "@/features/products/components/product-listing-grid"
import { Pagination } from "@/features/products/components/pagination"
import { useProductListing } from "@/features/products/hooks/use-product-listing"
import { useFilterStore } from "@/features/products/stores/filter-store"
import { X } from "lucide-react"
export function ProductsListingClient() {
  const { totalFiltered, totalAll } = useProductListing()
  const filters = useFilterStore((s) => s.filters)
  const setFilter = useFilterStore((s) => s.setFilter)
  const search = useFilterStore((s) => s.search)
  const resetFilters = useFilterStore((s) => s.resetFilters)
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount)

  // Build active filter badges
  const activeFilters: { label: string; onRemove: () => void }[] = []
  if (filters.category) {
    const catMap: Record<string, string> = { "full-face": "Full Face", modular: "Modular", "open-face": "Open Face", "3/4": "3/4 Helmet" }
    activeFilters.push({ label: catMap[filters.category] || filters.category, onRemove: () => setFilter("category", null) })
  }
  if (filters.brand) {
    activeFilters.push({ label: filters.brand, onRemove: () => setFilter("brand", null) })
  }
  if (filters.minPrice !== null || filters.maxPrice !== null) {
    const min = filters.minPrice ?? 0
    const max = filters.maxPrice ?? "∞"
    activeFilters.push({ label: `$${min} – $${max}`, onRemove: () => { setFilter("minPrice", null); setFilter("maxPrice", null) } })
  }
  if (filters.rating !== null) {
    activeFilters.push({ label: `${filters.rating}+ stars`, onRemove: () => setFilter("rating", null) })
  }
  if (filters.inStock === true) {
    activeFilters.push({ label: "In Stock", onRemove: () => setFilter("inStock", null) })
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      {/* Sidebar Filters - Desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <FilterSidebar />
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar />
          <div className="flex items-center gap-3">
            <SortDropdown />
            <MobileFilterDrawer />
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter) => (
              <span
                key={filter.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {filter.label}
                <button onClick={filter.onRemove} className="hover:text-primary/70" aria-label={`Remove ${filter.label} filter`}>
                  <X size={12} />
                </button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Result count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {search ? (
            <span>
              <span className="font-medium text-foreground">{totalFiltered}</span> result{totalFiltered !== 1 ? "s" : ""} for &ldquo;<span className="font-medium text-foreground">{search}</span>&rdquo;
            </span>
          ) : (
            <span>
              Showing <span className="font-medium text-foreground">{totalFiltered}</span> of{" "}
              <span className="font-medium text-foreground">{totalAll}</span> helmets
            </span>
          )}
        </div>

        {/* Product Grid */}
        <ProductListingGrid />

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  )
}