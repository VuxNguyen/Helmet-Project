import { getAll, update, remove } from "@/lib/json-db"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  slug?: string
  quantity: number
  variant?: string
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (body.quantity <= 0) {
      remove<CartItem>("cart.json", id)
    } else {
      update<CartItem>("cart.json", id, { quantity: body.quantity })
    }

    const items = getAll<CartItem>("cart.json")
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return Response.json({ items, total })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  remove<CartItem>("cart.json", id)

  const items = getAll<CartItem>("cart.json")
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return Response.json({ items, total })
}
