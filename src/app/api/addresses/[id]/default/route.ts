import { supabase } from "@/lib/supabase"

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const { data: target } = await supabase
    .from("addresses")
    .select("user_id")
    .eq("id", id)
    .maybeSingle()

  if (!target) {
    return Response.json({ error: "Address not found" }, { status: 404 })
  }

  // Unset all defaults for this user
  await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", target.user_id)

  // Set the target as default
  await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", id)

  return Response.json({ message: "Default address updated" })
}