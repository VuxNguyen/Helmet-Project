"use client"

import { useState, useMemo, useCallback } from "react"
import { Trash2, X, CheckCircle, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductsToolbar } from "./products-toolbar"
import { ProductsTable } from "./products-table"
import { AddProductSheet } from "./add-product-sheet"
import { EditProductSheet } from "./edit-product-sheet"
import { adminProducts, getFilteredProducts } from "../product-data"
import type { ProductStatus, AdminProduct } from "../types"

export function ProductsPage() {
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<ProductStatus | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts(adminProducts, {
        search,
        category: categoryFilter,
        brand: brandFilter,
        status: statusFilter,
      }),
    [search, categoryFilter, brandFilter, statusFilter],
  )

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids)
  }, [])

  const handleBulkDelete = useCallback(() => {
    console.log("Bulk delete:", selectedIds)
  }, [selectedIds])

  const handleBulkStatus = useCallback(
    (status: ProductStatus) => {
      console.log("Bulk status update:", selectedIds, status)
    },
    [selectedIds],
  )

  const handleClearSelection = useCallback(() => {
    setSelectedIds([])
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Products</h2>
        <p className="text-sm text-muted-foreground">
          Manage your product catalog.
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
          {selectedIds.length} selected
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleBulkStatus("active")}
          >
            <CheckCircle className="h-3 w-3" />
            Mark Active
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleBulkStatus("draft")}
          >
            <FileEdit className="h-3 w-3" />
            Mark Draft
          </Button>
          <Button
            variant="destructive"
            size="xs"
            onClick={handleBulkDelete}
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleClearSelection}
          >
            <X className="h-3 w-3" />
            Clear
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
