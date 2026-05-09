export interface AdminProduct {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  stock: number
  status: "active" | "draft" | "archived"
  rating: number
  reviewCount: number
  createdAt: string
  image: string
  description?: string
}

export type ProductStatus = AdminProduct["status"]

export interface ProductFilters {
  search: string
  category: string | null
  brand: string | null
  status: ProductStatus | null
}

export const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
]

export const CATEGORY_OPTIONS = [
  { value: "full-face", label: "Full Face" },
  { value: "modular", label: "Modular" },
  { value: "open-face", label: "Open Face" },
  { value: "3/4", label: "3/4 Helmet" },
]

const brands = ["Arai", "Shoei", "AGV", "Scorpion", "HJC", "Bell", "LS2", "KYT"]

export const BRAND_OPTIONS = brands.map((b) => ({ value: b.toLowerCase(), label: b }))
