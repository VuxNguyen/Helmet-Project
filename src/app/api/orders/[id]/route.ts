import { getById } from "@/lib/json-db"

interface Order {
  id: string
  orderNumber: string
  userId: string
  customer: { name: string; email: string }
  items: { id: string; name: string; sku: string; quantity: number; price: number; image: string }[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: string
  shippingAddress: Record<string, string>
  paymentMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const order = getById<Order>("orders.json", id)

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 })
  }

  return Response.json({ order })
}
