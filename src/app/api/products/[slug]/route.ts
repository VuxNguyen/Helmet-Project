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
  specifications: { label: string; value: string }[]
  reviews: { id: string; author: string; rating: number; date: string; title: string; content: string; helpful: number; verified: boolean }[]
  relatedIds: string[]
}

interface RelatedProduct {
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

function mapRelated(p: ProductRaw): RelatedProduct {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    slug: p.slug,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    rating: p.rating,
    reviewCount: p.reviewCount,
    inStock: p.inStock,
    colors: p.colors.map((c) => c.hex),
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const products = getAll<ProductRaw>("products.json")
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  const related = products.filter((p) => product.relatedIds.includes(p.id)).map(mapRelated)

  return Response.json({ product, related })
}
