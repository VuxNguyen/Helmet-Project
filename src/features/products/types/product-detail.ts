/**
 * Type definitions for the product detail page.
 */

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductReview {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
  verified: boolean
}

export interface ProductColor {
  name: string
  hex: string
  image?: string
}

export interface ProductSize {
  label: string
  inStock: boolean
  chest?: string
}

export interface ProductDetail {
  id: string
  name: string
  brand: string
  slug: string
  description: string
  shortDescription: string
  images: string[]
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  category: string
  categorySlug: string
  inStock: boolean
  stockCount: number
  sku: string
  featured?: boolean
  colors: ProductColor[]
  sizes: ProductSize[]
  specifications: ProductSpecification[]
  reviews: ProductReview[]
  relatedIds: string[]
}

export interface RelatedProduct {
  id: string
  name: string
  brand: string
  slug: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  inStock: boolean
  colors?: string[]
}