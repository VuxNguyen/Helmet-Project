import { getAll, create } from "@/lib/json-db"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  slug?: string
  quantity: number
  variant?: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, quantity, variant } = body

    if (!productId || !quantity) {
      return Response.json({ error: "productId and quantity are required" }, { status: 400 })
    }

    const item: CartItem = {
      id: productId,
      name: body.name || "Product",
      price: body.price || 0,
      image: body.image || "/placeholder-helmet.svg",
      quantity,
      variant,
    }
    create("cart.json", item)

    const items = getAll<CartItem>("cart.json")
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return Response.json({ items, total })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}
