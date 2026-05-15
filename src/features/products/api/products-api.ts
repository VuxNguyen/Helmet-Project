import axios from "axios"

export interface ProductsQueryParams {
  search?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  sortBy?: string
  page?: number
  pageSize?: number
}

export interface PaginationData {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ProductsResponse {
  products: ProductItem[]
  pagination: PaginationData
  availableBrands: string[]
  availableCategories: string[]
}

export interface ProductItem {
  id: string
  name: string
  brand: string
  slug: string
  description: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  category: string
  categorySlug: string
  inStock: boolean
  featured?: boolean
  colors?: string[]
  sizes?: string[]
}

export function getProducts(params: ProductsQueryParams) {
  return axios.get<ProductsResponse>("/api/products", { params }).then((r) => r.data)
}

export function getFeaturedProducts() {
  return axios.get<{ products: ProductItem[] }>("/api/products/featured").then((r) => r.data)
}

export function getProductBySlug(slug: string) {
  return axios.get<{ product: ProductItem; related: ProductItem[] }>(`/api/products/${slug}`).then((r) => r.data)
}
