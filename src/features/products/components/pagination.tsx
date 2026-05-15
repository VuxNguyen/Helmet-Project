"use client"

import { useFilterStore } from "../stores/filter-store"
import { useProductListing } from "../hooks/use-product-listing"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"

export function Pagination() {
  const { t } = useTranslations()
  const page = useFilterStore((s) => s.page)
  const setPage = useFilterStore((s) => s.setPage)
  const { pagination, totalFiltered } = useProductListing()

  const { currentPage, totalPages } = pagination

  if (totalPages <= 1) return null

  // Generate page numbers to display
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      if (currentPage > 3) pages.push("ellipsis")

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) pages.push(i)

      if (currentPage < totalPages - 2) pages.push("ellipsis")

      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-between gap-4 pt-8" aria-label={t("products_ext.pagination.label")}>
      {/* Result count */}
      <p className="text-sm text-muted-foreground">
        <span className="hidden sm:inline">
          {t("products.showingOf")
            .replace("{{count}}", String(Math.min(currentPage * pagination.pageSize, totalFiltered)))
            .replace("{{total}}", String(totalFiltered))}
        </span>
        <span className="sm:hidden">
          {t("products_ext.pagination.pageOf")
            .replace("{{current}}", String(currentPage))
            .replace("{{total}}", String(totalPages))}
        </span>
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label={t("products.previousPage")}
          className="h-9 w-9 p-0"
        >
          <ChevronLeft size={16} />
        </Button>

        {pageNumbers.map((pageNum, idx) =>
          pageNum === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(pageNum)}
              aria-label={t("products_ext.pagination.pageLabel").replace("{{number}}", String(pageNum))}
              aria-current={pageNum === currentPage ? "page" : undefined}
              className={cn(
                "h-9 w-9 p-0 text-sm",
                pageNum === currentPage && "pointer-events-none"
              )}
            >
              {pageNum}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label={t("products.nextPage")}
          className="h-9 w-9 p-0"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </nav>
  )
}