import { getById, update } from "@/lib/json-db"

interface Order {
  id: string
  status: string
  updatedAt?: string
}

const validTransitions: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status: newStatus } = body

    const order = getById<Order>("orders.json", id)
    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 })
    }

    const allowed = validTransitions[order.status]
    if (!allowed || !allowed.includes(newStatus)) {
      return Response.json(
        { error: `Cannot transition from ${order.status} to ${newStatus}` },
        { status: 400 },
      )
    }

    const updated = update<Order>("orders.json", id, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    })

    return Response.json({ order: updated })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}
