import { create } from "zustand"
import { getFilteredProducts } from "../product-data"
import {
  fetchAdminProducts,
  createAdminProduct as apiCreateProduct,
  updateAdminProduct as apiUpdateProduct,
  deleteAdminProduct as apiDeleteProduct,
} from "@/features/admin/api/admin-api"
import type { AdminProduct, ProductFilters, ProductStatus } from "../types"

interface AdminProductsState {
  items: AdminProduct[]
  loading: boolean
  setItems: (items: AdminProduct[]) => void
  fetchItems: () => Promise<void>
  addProduct: (product: Omit<AdminProduct, "id" | "rating" | "reviewCount" | "createdAt">) => void
  updateProduct: (id: string, data: Partial<AdminProduct>) => void
  removeProduct: (id: string) => void
  bulkUpdateStatus: (ids: string[], status: ProductStatus) => void
  bulkDelete: (ids: string[]) => void
  getFiltered: (filters: ProductFilters) => AdminProduct[]
}

function mapRawToProduct(p: { id: string; name: string; sku: string; brand: string; category: string; price: number; originalPrice?: number; stock: number; status: string; rating: number; reviewCount: number; createdAt: string; image: string; description?: string }): AdminProduct {
  return {
    id: p.id,
    name: p.name,
    sku: p.sku,
    brand: p.brand,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    stock: p.stock,
    status: p.status as ProductStatus,
    rating: p.rating,
    reviewCount: p.reviewCount,
    createdAt: p.createdAt,
    image: p.image,
    description: p.description,
  }
}

export const useAdminProductsStore = create<AdminProductsState>()((set, get) => ({
  items: [],
  loading: false,

  setItems: (items) => set({ items }),

  fetchItems: async () => {
    set({ loading: true })
    try {
      const data = await fetchAdminProducts({ pageSize: "100" })
      set({ items: data.products.map(mapRawToProduct), loading: false })
    } catch {
      set({ loading: false })
    }
  },

  addProduct: async (product) => {
    try {
      const result = await apiCreateProduct(product as Record<string, unknown>)
      const newProduct = result.product
      set((state) => ({
        items: [
          ...state.items,
          {
            id: newProduct.id,
            name: newProduct.name,
            sku: newProduct.sku,
            brand: newProduct.brand,
            category: newProduct.category,
            price: newProduct.price,
            originalPrice: newProduct.originalPrice,
            stock: newProduct.stock,
            status: newProduct.status as ProductStatus,
            rating: newProduct.rating,
            reviewCount: newProduct.reviewCount,
            createdAt: newProduct.createdAt,
            image: newProduct.image,
            description: newProduct.description,
          },
        ],
      }))
    } catch {
      // Fallback: add optimistically if API fails
      set((state) => ({
        items: [
          ...state.items,
          {
            ...product,
            id: `product-${Date.now()}`,
            rating: 0,
            reviewCount: 0,
            createdAt: new Date().toISOString().split("T")[0],
          },
        ],
      }))
    }
  },

  updateProduct: (id, data) => {
    apiUpdateProduct(id, data).catch(() => {})
    set((state) => ({
      items: state.items.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }))
  },

  removeProduct: (id) => {
    apiDeleteProduct(id).catch(() => {})
    set((state) => ({
      items: state.items.filter((p) => p.id !== id),
    }))
  },

  bulkUpdateStatus: (ids, status) => {
    ids.forEach((id) => apiUpdateProduct(id, { status }).catch(() => {}))
    set((state) => ({
      items: state.items.map((p) =>
        ids.includes(p.id) ? { ...p, status } : p,
      ),
    }))
  },

  bulkDelete: (ids) => {
    ids.forEach((id) => apiDeleteProduct(id).catch(() => {}))
    set((state) => ({
      items: state.items.filter((p) => !ids.includes(p.id)),
    }))
  },

  getFiltered: (filters) => getFilteredProducts(get().items, filters),
}))
