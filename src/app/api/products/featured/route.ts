import { getAll } from "@/lib/json-db"

interface ProductRaw {
  id: string
  name: string
  brand: string
  slug: string
  description: string
  shortDescription: string
  image: string
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
  colors: { name: string; hex: string }[]
  sizes: { label: string; inStock: boolean }[]
}

interface Product {
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

function mapProduct(p: ProductRaw): Product {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    slug: p.slug,
    description: p.description,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.categorySlug,
    categorySlug: p.categorySlug,
    inStock: p.inStock,
    featured: p.featured,
    colors: p.colors.map((c) => c.hex),
    sizes: p.sizes.map((s) => s.label),
  }
}

export async function GET() {
  const products = getAll<ProductRaw>("products.json")
  const featured = products.filter((p) => p.featured).map(mapProduct)
  return Response.json({ products: featured })
}
