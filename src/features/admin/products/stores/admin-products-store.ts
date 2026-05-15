import { create } from "zustand"
import { adminProducts, getFilteredProducts } from "../product-data"
import type { AdminProduct, ProductFilters, ProductStatus } from "../types"

let nextId = adminProducts.length + 1

interface AdminProductsState {
  items: AdminProduct[]
  addProduct: (product: Omit<AdminProduct, "id" | "rating" | "reviewCount" | "createdAt">) => void
  updateProduct: (id: string, data: Partial<AdminProduct>) => void
  removeProduct: (id: string) => void
  bulkUpdateStatus: (ids: string[], status: ProductStatus) => void
  bulkDelete: (ids: string[]) => void
  getFiltered: (filters: ProductFilters) => AdminProduct[]
}

export const useAdminProductsStore = create<AdminProductsState>()((set, get) => ({
  items: adminProducts,

  addProduct: (product) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...product,
          id: String(nextId++),
          rating: 0,
          reviewCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ],
    })),

  updateProduct: (id, data) =>
    set((state) => ({
      items: state.items.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),

  removeProduct: (id) =>
    set((state) => ({
      items: state.items.filter((p) => p.id !== id),
    })),

  bulkUpdateStatus: (ids, status) =>
    set((state) => ({
      items: state.items.map((p) =>
        ids.includes(p.id) ? { ...p, status } : p,
      ),
    })),

  bulkDelete: (ids) =>
    set((state) => ({
      items: state.items.filter((p) => !ids.includes(p.id)),
    })),

  getFiltered: (filters) => getFilteredProducts(get().items, filters),
}))
