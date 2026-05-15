import { getAll } from "@/lib/json-db"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  slug?: string
  quantity: number
  variant?: string
}

export async function GET() {
  const items = getAll<CartItem>("cart.json")
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return Response.json({ items, total })
}
