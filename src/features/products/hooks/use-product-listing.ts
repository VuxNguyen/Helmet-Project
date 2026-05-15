"use client"

import { useQuery } from "@tanstack/react-query"
import { useFilterStore } from "../stores/filter-store"
import { getProducts, type ProductItem } from "@/features/products/api/products-api"

export function useProductListing() {
  const search = useFilterStore((s) => s.search)
  const filters = useFilterStore((s) => s.filters)
  const sort = useFilterStore((s) => s.sort)
  const page = useFilterStore((s) => s.page)
  const pageSize = useFilterStore((s) => s.pageSize)

  const sortByMap: Record<string, string> = {
    featured: "popularity",
    newest: "popularity",
    "price-asc": "price-asc",
    "price-desc": "price-desc",
    "name-asc": "name-asc",
    "name-desc": "name-desc",
    rating: "popularity",
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products", search, filters, sort, page, pageSize],
    queryFn: () =>
      getProducts({
        search: search || undefined,
        category: filters.category || undefined,
        brand: filters.brand?.toLowerCase() || undefined,
        minPrice: filters.minPrice ?? undefined,
        maxPrice: filters.maxPrice ?? undefined,
        minRating: filters.rating ?? undefined,
        inStock: filters.inStock ?? undefined,
        sortBy: sortByMap[sort] || "popularity",
        page,
        pageSize,
      }),
  })

  const products = data?.products ?? []
  const pagination = data?.pagination ?? { page: 1, pageSize, total: 0, totalPages: 0 }

  const availableBrands = data?.availableBrands ?? []
  const availableCategories = data?.availableCategories ?? []

  return {
    products,
    pagination: {
      currentPage: pagination.page,
      totalPages: pagination.totalPages,
      totalItems: pagination.total,
      pageSize: pagination.pageSize,
    },
    totalFiltered: pagination.total,
    totalAll: pagination.total,
    availableBrands,
    availableCategories,
    isEmpty: products.length === 0 && !isLoading,
    isLoading,
  }
}
