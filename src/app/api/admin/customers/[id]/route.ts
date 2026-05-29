import { supabase } from "@/lib/supabase"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const { data: customer, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !customer) {
    return Response.json({ error: "Customer not found" }, { status: 404 })
  }

  return Response.json({ customer })
}