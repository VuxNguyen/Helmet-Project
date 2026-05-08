/**
 * Types for the product listing feature.
 */

export interface ProductFilters {
  category: string | null
  brand: string | null
  minPrice: number | null
  maxPrice: number | null
  inStock: boolean | null
  rating: number | null
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating"

export interface ProductListingParams {
  search: string
  category: string | null
  brand: string | null
  sort: SortOption
  page: number
  pageSize: number
  filters: ProductFilters
}

export interface PaginationState {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
}

export interface ProductListingResult<T> {
  items: T[]
  pagination: PaginationState
}

export const SORT_OPTIONS: { value: SortOption; labelVi: string; labelEn: string }[] = [
  { value: "featured", labelVi: "Nổi bật", labelEn: "Featured" },
  { value: "newest", labelVi: "Mới nhất", labelEn: "Newest" },
  { value: "price-asc", labelVi: "Giá: Thấp → Cao", labelEn: "Price: Low → High" },
  { value: "price-desc", labelVi: "Giá: Cao → Thấp", labelEn: "Price: High → Low" },
  { value: "name-asc", labelVi: "Tên: A → Z", labelEn: "Name: A → Z" },
  { value: "name-desc", labelVi: "Tên: Z → A", labelEn: "Name: Z → A" },
  { value: "rating", labelVi: "Đánh giá", labelEn: "Top Rated" },
]

export const PRICE_RANGES = [
  { label: "Under $200", min: null, max: 200 },
  { label: "$200 – $400", min: 200, max: 400 },
  { label: "$400 – $700", min: 400, max: 700 },
  { label: "$700 – $1,000", min: 700, max: 1000 },
  { label: "Over $1,000", min: 1000, max: null },
]

export const RATING_OPTIONS = [4, 3, 2, 1] as const

export const DEFAULT_PAGE_SIZE = 12