import { supabase } from "@/lib/supabase"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !order) {
    return Response.json({ error: "Order not found" }, { status: 404 })
  }

  return Response.json({ order })
}