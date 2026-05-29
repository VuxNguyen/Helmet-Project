import { type AdminProduct, type ProductFilters } from "./types"

export function getFilteredProducts(
  products: AdminProduct[],
  filters: ProductFilters,
): AdminProduct[] {
  return products.filter((product) => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const match =
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q)
      if (!match) return false
    }

    if (filters.category && product.category !== filters.category) {
      return false
    }

    if (filters.brand) {
      const brandSlug = product.brand.toLowerCase()
      if (brandSlug !== filters.brand) return false
    }

    if (filters.status && product.status !== filters.status) {
      return false
    }

    return true
  })
}