import { create } from "@/lib/json-db"

interface WishlistItem {
  id: string
  userId: string
  productId: string
  name: string
  price: number
  image: string
  inStock: boolean
  addedAt: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, productId, name, price, image, inStock } = body

    if (!productId) {
      return Response.json({ error: "productId is required" }, { status: 400 })
    }

    const newItem: WishlistItem = {
      id: `wish-${Date.now()}`,
      userId: userId || "guest",
      productId,
      name: name || "Product",
      price: price || 0,
      image: image || "/placeholder-helmet.svg",
      inStock: inStock ?? true,
      addedAt: new Date().toISOString(),
    }

    create("wishlist.json", newItem)
    return Response.json({ item: newItem }, { status: 201 })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}
