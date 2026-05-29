import { supabase } from "@/lib/supabase"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data: existing } = await supabase
      .from("addresses")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    if (!existing) {
      return Response.json({ error: "Address not found" }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}
    if (body.fullName) updateData.full_name = body.fullName
    if (body.phone !== undefined) updateData.phone = body.phone
    if (body.address) updateData.address = body.address
    if (body.city) updateData.city = body.city
    if (body.state) updateData.state = body.state
    if (body.zipCode) updateData.zip_code = body.zipCode
    if (body.isDefault !== undefined) updateData.is_default = body.isDefault

    const { data: updated, error } = await supabase
      .from("addresses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to update address" }, { status: 500 })
    }

    return Response.json({ address: updated })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id)

  if (error) {
    return Response.json({ error: "Address not found" }, { status: 404 })
  }

  return Response.json({ message: "Address deleted successfully" })
}