import { supabase } from "@/lib/supabase"

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

    // Get count of existing orders to generate order number
    const { count } = await supabase.from("orders").select("*", { count: "exact", head: true })
    const orderCount = count || 0
    const orderNumber = `ORD-2026-${String(orderCount + 1).padStart(3, "0")}`

    const { data: newOrder, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: null,
        customer_name: shipping.firstName + " " + shipping.lastName,
        customer_email: shipping.email,
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
        shipping_address: shipping,
        payment_method: paymentMethod || "credit-card",
      })
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to create order" }, { status: 500 })
    }

    return Response.json(
      {
        orderId: newOrder.id,
        orderNumber,
        status: "pending",
        total,
        createdAt: newOrder.created_at,
      },
      { status: 201 },
    )
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}