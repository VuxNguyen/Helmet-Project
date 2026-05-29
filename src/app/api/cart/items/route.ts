import { supabase } from "@/lib/supabase"

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

    const sessionId = "guest" // In production, get from auth or session

    const { error: insertError } = await supabase
      .from("cart_items")
      .insert({
        session_id: sessionId,
        product_id: productId,
        name: body.name || "Product",
        price: body.price || 0,
        image: body.image || "/placeholder-helmet.svg",
        quantity,
        variant,
      })

    if (insertError) {
      return Response.json({ error: "Failed to add item to cart" }, { status: 500 })
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("session_id", sessionId)

    if (error) {
      return Response.json({ error: "Failed to fetch cart" }, { status: 500 })
    }

    const items = (data as CartItem[]) || []
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return Response.json({ items, total })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}