import { getAll } from "@/lib/json-db"

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let items = getAll<WishlistItem>("wishlist.json")
  if (userId) {
    items = items.filter((i) => i.userId === userId)
  }

  return Response.json({ items })
}
