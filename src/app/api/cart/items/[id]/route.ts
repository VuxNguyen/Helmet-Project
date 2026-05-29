import { supabase } from "@/lib/supabase"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (body.quantity <= 0) {
      await supabase.from("cart_items").delete().eq("id", id)
    } else {
      await supabase.from("cart_items").update({ quantity: body.quantity }).eq("id", id)
    }

    const { data: items } = await supabase.from("cart_items").select("*")
    const total = (items || []).reduce((sum, i) => sum + i.price * i.quantity, 0)
    return Response.json({ items: items || [], total })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  await supabase.from("cart_items").delete().eq("id", id)

  const { data: items } = await supabase.from("cart_items").select("*")
  const total = (items || []).reduce((sum, i) => sum + i.price * i.quantity, 0)
  return Response.json({ items: items || [], total })
}