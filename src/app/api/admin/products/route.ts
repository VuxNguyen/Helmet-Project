import { getAll, create } from "@/lib/json-db"

interface RawProduct {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  categorySlug: string
  price: number
  originalPrice?: number
  stockCount: number
  rating: number
  reviewCount: number
  image: string
  description: string
  featured?: boolean
}

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
  const status = searchParams.get("status")
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") || "desc"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

  let products = getAll<RawProduct>("products.json").map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    brand: p.brand,
    category: p.categorySlug || p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    stock: p.stockCount,
    status: (p.stockCount === 0 ? "archived" : "active") as "active" | "draft" | "archived",
    rating: p.rating,
    reviewCount: p.reviewCount,
    createdAt: new Date().toISOString(),
    image: p.image,
    description: p.description,
  }))

  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search),
    )
  }
  if (category) {
    products = products.filter((p) => p.category === category)
  }
  if (brand) {
    products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
  }
  if (status) {
    products = products.filter((p) => p.status === status)
  }

  products.sort((a, b) => {
    const dir = sortOrder === "asc" ? 1 : -1
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir
    if (sortBy === "price") return (a.price - b.price) * dir
    if (sortBy === "stock") return (a.stock - b.stock) * dir
    return 0
  })

  const total = products.length
  const totalPages = Math.ceil(total / pageSize)
  const paginated = products.slice((page - 1) * pageSize, page * pageSize)

  return Response.json({
    products: paginated,
    pagination: { page, pageSize, total, totalPages },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProduct: AdminProduct = {
      id: `product-${Date.now()}`,
      name: body.name,
      sku: body.sku || `HELM-${String(getAll<RawProduct>("products.json").length + 1).padStart(4, "0")}`,
      brand: body.brand,
      category: body.category,
      price: body.price,
      originalPrice: body.originalPrice,
      stock: body.stock || 0,
      status: body.status || "draft",
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      image: body.image || "/placeholder-helmet.svg",
      description: body.description,
    }

    create("products.json", newProduct)
    return Response.json({ product: newProduct }, { status: 201 })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}
