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
  discount_percent?: number
  rating: number
  review_count: number
  category: string
  category_slug: string
  in_stock: boolean
  stock_count: number
  sku: string
  is_featured?: boolean
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

  // Fetch product images from the product_images table
  const { data: productImages } = await supabase
    .from("product_images")
    .select("url")
    .eq("product_id", (product as ProductRaw).id)
    .order("sort_order", { ascending: true })

  // Build images array: use main image as first, then append product_images
  const rawProduct = product as ProductRaw
  const images: string[] = []
  if (rawProduct.image) images.push(rawProduct.image)
  if (productImages) {
    for (const img of productImages) {
      if (!images.includes(img.url)) {
        images.push(img.url)
      }
    }
  }

  // Build the transformed product object
  const transformedProduct = {
    ...rawProduct,
    images,
    brand: rawProduct.brand || "",
    categorySlug: rawProduct.category_slug || "",
    category: "", // No category field in products table directly
    inStock: rawProduct.in_stock ?? rawProduct.stock_count > 0,
    reviewCount: rawProduct.review_count ?? 0,
    originalPrice: rawProduct.original_price ?? undefined,
    discount: rawProduct.discount_percent ?? undefined,
    relatedIds: rawProduct.related_ids ?? [],
    reviews: rawProduct.reviews ?? [],
    colors: rawProduct.colors ?? [],
    sizes: rawProduct.sizes ?? [],
    specifications: rawProduct.specifications ?? [],
    featured: rawProduct.is_featured ?? false,
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

  return Response.json({ product: transformedProduct, related })
}
