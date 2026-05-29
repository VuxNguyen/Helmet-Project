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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id") || "guest"

  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("session_id", sessionId)

  if (error) {
    return Response.json({ error: "Failed to fetch cart" }, { status: 500 })
  }

  const items = (data as CartItem[]) || []
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return Response.json({ items, total })
}