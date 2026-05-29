import { supabase } from "@/lib/supabase"

interface AdminProduct {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase()
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const sortBy = searchParams.get("sortBy") || "created_at"
  const sortOrder = searchParams.get("sortOrder") || "desc"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

  let query = supabase.from("products").select("*", { count: "exact" })

  if (search) {
    query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%,brand.ilike.%${search}%`)
  }
  if (category) {
    query = query.eq("category_slug", category)
  }
  if (brand) {
    query = query.ilike("brand", brand)
  }

  // Apply sorting
  const orderCol = sortBy === "name" ? "name" : sortBy === "price" ? "price" : "created_at"
  query = query.order(orderCol, { ascending: sortOrder === "asc" })

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    return Response.json({ error: "Failed to fetch products" }, { status: 500 })
  }

  const products: AdminProduct[] = (data || []).map((p: Record<string, unknown>) => ({
    id: p.id as string,
    name: p.name as string,
    sku: (p.sku as string) || "",
    brand: p.brand as string,
    category: (p.category_slug as string) || (p.category as string) || "",
    price: p.price as number,
    originalPrice: p.original_price as number | undefined,
    stock: (p.stock_count as number) || 0,
    status: ((p.stock_count as number) === 0 ? "archived" : "active") as "active" | "draft" | "archived",
    rating: (p.rating as number) || 0,
    reviewCount: (p.review_count as number) || 0,
    createdAt: (p.created_at as string) || new Date().toISOString(),
    image: (p.image as string) || "/placeholder-helmet.svg",
    description: p.description as string,
  }))

  const total = count || 0
  const totalPages = Math.ceil(total / pageSize)

  return Response.json({
    products,
    pagination: { page, pageSize, total, totalPages },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Get count for SKU generation
    const { count } = await supabase.from("products").select("*", { count: "exact", head: true })
    const sku = body.sku || `HELM-${String((count || 0) + 1).padStart(4, "0")}`

    const { data: newProduct, error } = await supabase
      .from("products")
      .insert({
        name: body.name,
        sku,
        brand: body.brand,
        category_slug: body.category,
        price: body.price,
        original_price: body.originalPrice,
        stock_count: body.stock || 0,
        image: body.image || "/placeholder-helmet.svg",
        description: body.description || "",
        in_stock: (body.stock || 0) > 0,
      })
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to create product" }, { status: 500 })
    }

    return Response.json({ product: newProduct }, { status: 201 })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}