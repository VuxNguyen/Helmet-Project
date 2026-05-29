"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Trash2, X, CheckCircle, FileEdit } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductsToolbar } from "./products-toolbar"
import { ProductsTable } from "./products-table"
import { AddProductSheet } from "./add-product-sheet"
import { EditProductSheet } from "./edit-product-sheet"
import { useAdminProductsStore } from "../stores/admin-products-store"
import { getFilteredProducts } from "../product-data"
import { useTranslations } from "@/hooks/use-translations"
import type { ProductStatus, AdminProduct } from "../types"

export function ProductsPage() {
  const { t } = useTranslations()
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<ProductStatus | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const bulkUpdateStatus = useAdminProductsStore((s) => s.bulkUpdateStatus)
  const bulkDelete = useAdminProductsStore((s) => s.bulkDelete)
  const items = useAdminProductsStore((s) => s.items)
  const fetchItems = useAdminProductsStore((s) => s.fetchItems)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts(items, {
        search,
        category: categoryFilter,
        brand: brandFilter,
        status: statusFilter,
      }),
    [items, search, categoryFilter, brandFilter, statusFilter],
  )

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids)
  }, [])

  const handleBulkDelete = useCallback(() => {
    bulkDelete(selectedIds)
    setSelectedIds([])
    toast.success(`${selectedIds.length} product(s) deleted`)
  }, [selectedIds, bulkDelete])

  const handleBulkStatus = useCallback(
    (status: ProductStatus) => {
      bulkUpdateStatus(selectedIds, status)
      toast.success(`${selectedIds.length} product(s) marked as ${status}`)
    },
    [selectedIds, bulkUpdateStatus],
  )

  const handleClearSelection = useCallback(() => {
    setSelectedIds([])
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t("admin.products.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("admin.products.description")}
        </p>
      </div>

      <ProductsToolbar
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        brandFilter={brandFilter}
        onBrandChange={setBrandFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onAddProduct={() => setAddProductOpen(true)}
      />

      <AddProductSheet
        open={addProductOpen}
        onOpenChange={setAddProductOpen}
      />

      <EditProductSheet
        open={!!editingProduct}
        onOpenChange={(open) => { if (!open) setEditingProduct(null) }}
        product={editingProduct}
      />

      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-all",
          selectedIds.length > 0
            ? "border-border bg-muted/50 opacity-100"
            : "pointer-events-none border-transparent opacity-0",
        )}
      >
        <span className="text-sm font-medium">
          {selectedIds.length} {t("admin.products.selected")}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleBulkStatus("active")}
          >
            <CheckCircle className="h-3 w-3" />
            {t("admin.products.active")}
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleBulkStatus("draft")}
          >
            <FileEdit className="h-3 w-3" />
            {t("admin.products.draft")}
          </Button>
          <Button
            variant="destructive"
            size="xs"
            onClick={handleBulkDelete}
          >
            <Trash2 className="h-3 w-3" />
            {t("admin.products.table.delete")}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleClearSelection}
          >
            <X className="h-3 w-3" />
            {t("admin.products.clearFilters")}
          </Button>
        </div>
      </div>

      <ProductsTable
        data={filteredProducts}
        onSelectionChange={handleSelectionChange}
        onEdit={setEditingProduct}
      />
    </div>
  )
}
