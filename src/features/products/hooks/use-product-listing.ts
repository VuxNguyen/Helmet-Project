/**
 * Hook that provides filtered, sorted, and paginated product data
 * based on the current filter store state.
 */

"use client"

import { useMemo } from "react"
import { type Product } from "@/data/products"
import { listingProducts } from "../data/listing-products"
import { useFilterStore } from "../stores/filter-store"
import { type PaginationState } from "../types/product-listing"

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products]
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price)
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "newest":
      // In a real app, sort by date. Here we use ID as proxy.
      return sorted.sort((a, b) => Number(b.id) - Number(a.id))
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      })
  }
}

function filterProducts(products: Product[], search: string, filters: Record<string, unknown>): Product[] {
  return products.filter((product) => {
    // Search
    if (search) {
      const q = search.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
      if (!matchesSearch) return false
    }

    // Category
    if (filters.category && product.category !== filters.category) {
      return false
    }

    // Brand
    if (filters.brand && product.brand.toLowerCase() !== (filters.brand as string).toLowerCase()) {
      return false
    }

    // Price range
    if (filters.minPrice !== null && product.price < (filters.minPrice as number)) {
      return false
    }
    if (filters.maxPrice !== null && product.price > (filters.maxPrice as number)) {
      return false
    }

    // In stock
    if (filters.inStock !== null && product.inStock !== filters.inStock) {
      return false
    }

    // Rating
    if (filters.rating !== null && product.rating < (filters.rating as number)) {
      return false
    }

    return true
  })
}

export function useProductListing() {
  const search = useFilterStore((s) => s.search)
  const filters = useFilterStore((s) => s.filters)
  const sort = useFilterStore((s) => s.sort)
  const page = useFilterStore((s) => s.page)
  const pageSize = useFilterStore((s) => s.pageSize)

  const result = useMemo(() => {
    // Apply filters
    const filtered = filterProducts(listingProducts, search, filters as unknown as Record<string, unknown>)

    // Apply sorting
    const sorted = sortProducts(filtered, sort)

    // Calculate pagination
    const totalItems = sorted.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const currentPage = Math.min(page, totalPages)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedItems = sorted.slice(startIndex, endIndex)

    const pagination: PaginationState = {
      currentPage,
      totalPages,
      totalItems,
      pageSize,
    }

    return {
      items: paginatedItems,
      pagination,
      allFiltered: filtered,
    }
  }, [search, filters, sort, page, pageSize])

  // Get unique brands from filtered results
  const availableBrands = useMemo(() => {
    const brands = new Set(listingProducts.map((p) => p.brand))
    return Array.from(brands).sort()
  }, [])

  // Get unique categories
  const availableCategories = useMemo(() => {
    const cats = new Set(listingProducts.map((p) => p.category))
    return Array.from(cats).sort()
  }, [])

  return {
    products: result.items,
    pagination: result.pagination,
    totalFiltered: result.allFiltered.length,
    totalAll: listingProducts.length,
    availableBrands,
    availableCategories,
    isEmpty: result.items.length === 0,
  }
}