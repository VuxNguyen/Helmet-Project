1
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, productId, name, price, image } = body

    if (!productId) {
      return Response.json({ error: "productId is required" }, { status: 400 })
    }

    const { error } = await supabase
      .from("wishlist_items")
      .insert({
        user_id: userId || "guest",
        product_id: productId,
        name: name || "Product",
        price: price || 0,
        image: image || "/placeholder-helmet.svg",
      })

    if (error) {
      return Response.json({ error: "Failed to add to wishlist" }, { status: 500 })
    }

    return Response.json({ success: true }, { status: 201 })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}