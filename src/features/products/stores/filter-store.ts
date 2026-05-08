/**
 * Zustand store for product listing filters.
 * Keeps filter state persistent while navigating between pages.
 */

"use client"

import { create } from "zustand"
import { type ProductFilters, type SortOption, DEFAULT_PAGE_SIZE } from "../types/product-listing"

interface FilterState {
  // Search
  search: string
  // Filters
  filters: ProductFilters
  // Sort
  sort: SortOption
  // Pagination
  page: number
  pageSize: number
  // Mobile drawer
  isFilterDrawerOpen: boolean
  // Active filter count
  activeFilterCount: number

  // Actions
  setSearch: (search: string) => void
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void
  resetFilters: () => void
  setSort: (sort: SortOption) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  openFilterDrawer: () => void
  closeFilterDrawer: () => void
  toggleFilterDrawer: () => void
}

const defaultFilters: ProductFilters = {
  category: null,
  brand: null,
  minPrice: null,
  maxPrice: null,
  inStock: null,
  rating: null,
}

export const useFilterStore = create<FilterState>((set, get) => ({
  search: "",
  filters: { ...defaultFilters },
  sort: "featured" as SortOption,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  isFilterDrawerOpen: false,

  get activeFilterCount(): number {
    const { filters } = get()
    let count = 0
    if (filters.category) count++
    if (filters.brand) count++
    if (filters.minPrice !== null) count++
    if (filters.maxPrice !== null) count++
    if (filters.inStock !== null) count++
    if (filters.rating !== null) count++
    return count
  },

  setSearch: (search) => set({ search, page: 1 }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      page: 1, // Reset to first page on filter change
    })),

  resetFilters: () => set({ filters: { ...defaultFilters }, page: 1 }),

  setSort: (sort) => set({ sort, page: 1 }),

  setPage: (page) => set({ page }),

  setPageSize: (pageSize) => set({ pageSize, page: 1 }),

  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),

  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),

  toggleFilterDrawer: () =>
    set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
}))