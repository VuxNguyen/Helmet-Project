import { supabase } from "@/lib/supabase"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("id", id)

  if (error) {
    return Response.json({ error: "Wishlist item not found" }, { status: 404 })
  }

  return Response.json({ message: "Item removed from wishlist" })
}