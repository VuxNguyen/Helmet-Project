import { remove } from "@/lib/json-db"

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

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const deleted = remove<WishlistItem>("wishlist.json", id)

  if (!deleted) {
    return Response.json({ error: "Wishlist item not found" }, { status: 404 })
  }

  return Response.json({ message: "Item removed from wishlist" })
}
