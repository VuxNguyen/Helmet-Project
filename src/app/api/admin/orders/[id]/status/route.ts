import { supabase } from "@/lib/supabase"

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

    const { data: order } = await supabase
      .from("orders")
      .select("status")
      .eq("id", id)
      .maybeSingle()

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

    const { data: updated, error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to update order status" }, { status: 500 })
    }

    return Response.json({ order: updated })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}