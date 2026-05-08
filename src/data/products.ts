/**
 * Shared product type definitions for the e-commerce frontend.
 */

export interface Product {
  id: string
  name: string
  brand: string
  slug: string
  description: string
  image: string
  images?: string[]
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  category: string
  inStock: boolean
  featured?: boolean
  colors?: string[]
  sizes?: string[]
}

export type { Product as ProductType }