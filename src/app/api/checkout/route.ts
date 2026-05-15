import { getAll, create } from "@/lib/json-db"

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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { shipping, shippingMethod, paymentMethod, items } = body

    if (!shipping || !items || items.length === 0) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const shippingCosts: Record<string, number> = {
      standard: 0,
      express: 12.99,
      "next-day": 24.99,
    }
    const shippingCost = shippingCosts[shippingMethod as string] || 0
    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0)
    const tax = Math.round(subtotal * 0.08 * 100) / 100
    const total = Math.round((subtotal + shippingCost + tax) * 100) / 100

    const orderNumber = `ORD-2026-${String(getAll<Order>("orders.json").length + 1).padStart(3, "0")}`

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      userId: "guest",
      customer: { name: shipping.firstName + " " + shipping.lastName, email: shipping.email },
      items: items.map((item: { productId: string; name: string; quantity: number; price: number }) => ({
        id: item.productId,
        name: item.name,
        sku: "",
        quantity: item.quantity,
        price: item.price,
        image: "/placeholder-helmet.svg",
      })),
      total,
      subtotal,
      shipping: shippingCost,
      tax,
      status: "pending",
      shippingAddress: shipping,
      paymentMethod: paymentMethod || "credit-card",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    create("orders.json", newOrder)

    return Response.json(
      {
        orderId: newOrder.id,
        orderNumber,
        status: "pending",
        total,
        createdAt: newOrder.createdAt,
      },
      { status: 201 },
    )
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}
