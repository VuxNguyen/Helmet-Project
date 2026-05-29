import { supabase } from "@/lib/supabase"

interface ProductRaw {
  id: string
  name: string
  brand: string
  slug: string
  description: string
  short_description: string
  image: string
  images: string[]
  price: number
  original_price?: number
  discount?: number
  rating: number
  review_count: number
  category: string
  category_slug: string
  in_stock: boolean
  stock_count: number
  sku: string
  featured?: boolean
  colors: { name: string; hex: string }[]
  sizes: { label: string; in_stock: boolean }[]
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
    originalPrice: p.original_price,
    discount: p.discount,
    rating: p.rating,
    reviewCount: p.review_count,
    category: p.category_slug,
    categorySlug: p.category_slug,
    inStock: p.in_stock,
    featured: p.featured,
    colors: p.colors?.map((c) => c.hex),
    sizes: p.sizes?.map((s) => s.label),
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)

  if (error) {
    return Response.json({ error: "Failed to fetch featured products" }, { status: 500 })
  }

  const products = (data as ProductRaw[] || []).map(mapProduct)
  return Response.json({ products })
}