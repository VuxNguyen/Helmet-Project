import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let query = supabase.from("wishlist_items").select("*")

  if (userId) {
    query = query.eq("user_id", userId)
  }

  const { data, error } = await query

  if (error) {
    return Response.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }

  return Response.json({ items: data || [] })
}