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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase()
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")?.toLowerCase()
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const minRating = searchParams.get("minRating")
  const inStock = searchParams.get("inStock")
  const sortBy = searchParams.get("sortBy") || "popularity"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "12")

  let query = supabase.from("products").select("*", { count: "exact" })

  if (search) {
    query = query.or(`name.ilike.%${search}%,brand.ilike.%${search}%,description.ilike.%${search}%`)
  }
  if (category) {
    query = query.eq("category_slug", category)
  }
  if (brand) {
    query = query.ilike("brand", brand)
  }
  if (minPrice) {
    query = query.gte("price", Number(minPrice))
  }
  if (maxPrice) {
    query = query.lte("price", Number(maxPrice))
  }
  if (minRating) {
    query = query.gte("rating", Number(minRating))
  }
  if (inStock === "true") {
    query = query.eq("in_stock", true)
  }

  // Apply sorting
  switch (sortBy) {
    case "name-asc":
      query = query.order("name", { ascending: true })
      break
    case "name-desc":
      query = query.order("name", { ascending: false })
      break
    case "price-asc":
      query = query.order("price", { ascending: true })
      break
    case "price-desc":
      query = query.order("price", { ascending: false })
      break
    default:
      // popularity = rating * review_count (sort by rating desc, then review_count desc)
      query = query.order("rating", { ascending: false }).order("review_count", { ascending: false })
  }

  // Pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    return Response.json({ error: "Failed to fetch products" }, { status: 500 })
  }

  const products = (data as ProductRaw[] || []).map(mapProduct)
  const total = count || 0
  const totalPages = Math.ceil(total / pageSize)

  // Get available brands and categories from all products
  const { data: allProducts } = await supabase
    .from("products")
    .select("brand, category_slug")

  const availableBrands = allProducts
    ? Array.from(new Set(allProducts.map((p: { brand: string }) => p.brand))).sort()
    : []
  const availableCategories = allProducts
    ? Array.from(new Set(allProducts.map((p: { category_slug: string }) => p.category_slug))).sort()
    : []

  return Response.json({
    products,
    pagination: { page, pageSize, total, totalPages },
    availableBrands,
    availableCategories,
  })
}