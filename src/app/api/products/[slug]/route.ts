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
  specifications: { label: string; value: string }[]
  reviews: { id: string; author: string; rating: number; date: string; title: string; content: string; helpful: number; verified: boolean }[]
  related_ids: string[]
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error || !product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  // Fetch related products
  const relatedIds = (product as ProductRaw).related_ids || []
  let related: RelatedProduct[] = []
  if (relatedIds.length > 0) {
    const { data: relatedData } = await supabase
      .from("products")
      .select("id, name, brand, slug, image, price, original_price, discount, rating, review_count, in_stock, colors")
      .in("id", relatedIds)

    if (relatedData) {
      related = relatedData.map((p: Record<string, unknown>) => ({
        id: p.id as string,
        name: p.name as string,
        brand: p.brand as string,
        slug: p.slug as string,
        image: p.image as string,
        price: p.price as number,
        originalPrice: p.original_price as number | undefined,
        discount: p.discount as number | undefined,
        rating: p.rating as number,
        reviewCount: p.review_count as number,
        inStock: p.in_stock as boolean,
        colors: ((p.colors as { name: string; hex: string }[]) || []).map((c) => c.hex),
      }))
    }
  }

  return Response.json({ product, related })
}