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

  let products = getAll<ProductRaw>("products.json").map(mapProduct)

  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search),
    )
  }
  if (category) {
    products = products.filter((p) => p.categorySlug === category)
  }
  if (brand) {
    products = products.filter((p) => p.brand.toLowerCase() === brand)
  }
  if (minPrice) {
    products = products.filter((p) => p.price >= Number(minPrice))
  }
  if (maxPrice) {
    products = products.filter((p) => p.price <= Number(maxPrice))
  }
  if (minRating) {
    products = products.filter((p) => p.rating >= Number(minRating))
  }
  if (inStock === "true") {
    products = products.filter((p) => p.inStock)
  }

  switch (sortBy) {
    case "name-asc":
      products.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      products.sort((a, b) => b.name.localeCompare(a.name))
      break
    case "price-asc":
      products.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      products.sort((a, b) => b.price - a.price)
      break
    default:
      products.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
  }

  const total = products.length
  const totalPages = Math.ceil(total / pageSize)
  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize)

  const allProducts = getAll<ProductRaw>("products.json")
  const availableBrands = Array.from(new Set(allProducts.map((p) => p.brand))).sort()
  const availableCategories = Array.from(new Set(allProducts.map((p) => p.categorySlug))).sort()

  return Response.json({
    products: paginatedProducts,
    pagination: { page, pageSize, total, totalPages },
    availableBrands,
    availableCategories,
  })
}
